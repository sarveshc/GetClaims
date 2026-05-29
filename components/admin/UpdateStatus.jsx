"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";

const STATUS_OPTIONS = [
  { value: "new",         label: "New" },
  { value: "contacted",   label: "Contacted" },
  { value: "in_review",   label: "In Review" },
  { value: "accepted",    label: "Accepted" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved",    label: "Resolved" },
  { value: "closed",      label: "Closed" },
];

export default function UpdateStatus({ submissionId, currentStatus }) {
  const [status,  setStatus]  = useState(currentStatus);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (status === currentStatus) return;
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch(`/api/admin/submissions/${submissionId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status }),
      });
      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setTimeout(() => { setSaved(false); router.refresh(); }, 1500);
      } else {
        setError(data.error || "Failed to update");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
    }}>
      <h3 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 700, color: "#1a1a2e" }}>
        Update Status
      </h3>
      <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#6b7280" }}>
        Current: <StatusBadge status={currentStatus} />
      </p>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%", height: "42px", padding: "0 12px",
          borderRadius: "8px", border: "1px solid #d1d5db",
          fontSize: "13px", color: "#374151", marginBottom: "12px",
          background: "#fff",
        }}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {error && (
        <p style={{ fontSize: "12px", color: "#dc2626", marginBottom: "10px" }}>⚠ {error}</p>
      )}

      <button
        onClick={handleSave}
        disabled={saving || status === currentStatus}
        style={{
          width: "100%", height: "40px", borderRadius: "8px",
          border: "none",
          background: saved ? "#059669" : (status === currentStatus ? "#f3f4f6" : "#0d6efd"),
          color: status === currentStatus ? "#9ca3af" : "#fff",
          fontSize: "13px", fontWeight: 600,
          cursor: status === currentStatus ? "default" : "pointer",
          transition: "background 0.2s",
        }}
      >
        {saving ? "Saving…" : saved ? "✓ Status Updated" : "Save Status"}
      </button>
    </div>
  );
}
