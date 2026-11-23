import Link from "next/link";
import Header from "@/components/home-page/home-10/Header";
import Footer from "@/components/home-page/home-10/Footer";

export const metadata = {
  title: "Subscription Confirmed | GetClaims",
  description: "Your GetClaims annual membership is active. No consultation fee applies to your cases.",
};

const SubscriptionSuccess = ({ searchParams }) => {
  const name = searchParams?.name ? decodeURIComponent(searchParams.name) : "Member";

  return (
    <>
      <Header />
      <div style={{ background: "#FFFBF3", minHeight: "80vh", padding: "148px 0 80px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center">

              {/* Success icon */}
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "#DCFCE7", margin: "0 auto 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>

              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#E8920A", marginBottom: "12px" }}>
                Payment Successful
              </p>
              <h1 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700,
                color: "#1C354F", marginBottom: "16px",
              }}>
                Welcome, {name}!
              </h1>
              <p style={{ fontSize: "16px", color: "#5C7089", lineHeight: "1.7", marginBottom: "32px" }}>
                Your <strong style={{ color: "#1C354F" }}>GetClaims Annual Membership</strong> is now active.
                You will not be charged any consultation fee — just submit your case and our experts will get in touch.
              </p>

              {/* Membership card */}
              <div style={{
                background: "#1C354F", borderRadius: "16px", padding: "28px 32px",
                marginBottom: "32px", textAlign: "left",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#FDDFA0", marginBottom: "6px" }}>
                      GetClaims Member
                    </p>
                    <p style={{ fontSize: "20px", fontWeight: 700, color: "#fff", margin: 0 }}>{name}</p>
                  </div>
                  <div style={{
                    background: "#E8920A", color: "#fff", borderRadius: "20px",
                    padding: "6px 16px", fontSize: "13px", fontWeight: 700,
                  }}>
                    Active
                  </div>
                </div>
                <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    {[
                      { label: "Plan", value: "Annual — ₹499/year" },
                      { label: "Consultation Fee", value: "₹0 (Waived)" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>{item.label}</p>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{
                background: "#fff", border: "1px solid #EDE7D9", borderRadius: "12px",
                padding: "24px 28px", marginBottom: "32px", textAlign: "left",
              }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#1C354F", marginBottom: "16px" }}>
                  What your membership includes:
                </p>
                {[
                  "No consultation fee on all cases",
                  "Priority case review within 24 hours",
                  "Dedicated case manager assigned",
                  "Direct WhatsApp access to our team",
                  "Valid for 1 year from today",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0", fontSize: "14px", color: "#5C7089" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#DCFCE7", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/contact/contact-v2" style={{
                background: "#E8920A", color: "#fff", padding: "14px 32px",
                borderRadius: "12px", fontSize: "15px", fontWeight: 600,
                textDecoration: "none", display: "inline-block", marginBottom: "16px",
              }}>
                Submit Your Case Now
              </Link>
              <br />
              <Link href="/" style={{ fontSize: "14px", color: "#5C7089", textDecoration: "none" }}>
                ← Back to Home
              </Link>

            </div>
          </div>
        </div>
      </div>

      <div className="footer-style-one theme-basic-footer position-relative">
        <div className="shapes shape-one" />
        <div className="container">
          <div className="inner-wrapper">
            <Footer />
            <div className="bottom-footer">
              <p className="copyright text-center m0">© 2026@getclaims.in</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSuccess;
