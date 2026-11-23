"use client";

import { useState } from "react";

const INITIAL = { name: "", email: "", phone: "" };

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function SubscribeButton() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit mobile required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubscribe = async () => {
    if (!validate()) return;
    setStatus("loading");
    setErrMsg("");

    try {
      const orderRes = await fetch("/api/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const orderData = await orderRes.json();
      if (!orderData.orderId) throw new Error(orderData.error || "Could not create order");

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Payment SDK failed to load. Please check your internet connection.");

      setStatus("idle");

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "GetClaims",
        description: "1-Case Plan — ₹499",
        order_id: orderData.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#E8920A" },
        modal: { ondismiss: () => setStatus("idle") },
        handler: async (response) => {
          setStatus("loading");
          const verifyRes = await fetch("/api/subscription/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              name: form.name,
              email: form.email,
              phone: form.phone,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            window.location.href = `/subscription/success?name=${encodeURIComponent(form.name)}`;
          } else {
            setErrMsg(result.error || "Payment verified but subscription could not be saved. Contact support@getclaims.in.");
            setStatus("error");
          }
        },
      });
      rzp.open();
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const isBusy = status === "loading";
  const inp = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    disabled: isBusy,
    style: {
      width: "100%", height: "48px", padding: "0 14px",
      borderRadius: "8px", border: `1px solid ${errors[name] ? "#dc3545" : "#EDE7D9"}`,
      fontSize: "14px", background: "#fff", outline: "none",
    },
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
        <div>
          <input {...inp("name")} type="text" placeholder="Full Name" />
          {errors.name && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#dc3545" }}>{errors.name}</p>}
        </div>
        <div>
          <input {...inp("email")} type="email" placeholder="Email Address" />
          {errors.email && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#dc3545" }}>{errors.email}</p>}
        </div>
        <div>
          <input {...inp("phone")} type="tel" placeholder="Mobile Number (10 digits)" maxLength={10} />
          {errors.phone && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#dc3545" }}>{errors.phone}</p>}
        </div>
      </div>

      {errMsg && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px",
          padding: "10px 14px", marginBottom: "14px",
        }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#dc2626" }}>⚠ {errMsg}</p>
        </div>
      )}

      <button
        onClick={handleSubscribe}
        disabled={isBusy}
        style={{
          width: "100%", background: isBusy ? "#c5a062" : "#E8920A",
          color: "#fff", border: "none", borderRadius: "12px",
          padding: "14px 24px", fontSize: "15px", fontWeight: 700,
          cursor: isBusy ? "not-allowed" : "pointer", transition: "background 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        }}
      >
        {isBusy ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Processing…
          </>
        ) : (
          "Pay ₹499 — Start My Case"
        )}
      </button>

      <p style={{ textAlign: "center", fontSize: "11px", color: "#5C7089", marginTop: "10px" }}>
        🔒 Secured by Razorpay · UPI, Cards, Net Banking accepted
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
