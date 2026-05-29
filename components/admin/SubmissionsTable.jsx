"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

const COMPLAINT_LABELS = {
  claim_rejection:     "Claim Rejection",
  delayed_claim:       "Delayed Claim",
  short_settlement:    "Short Settlement",
  mis_selling:         "Mis-selling",
  policy_cancellation: "Policy Cancellation",
  non_disclosure:      "Non-disclosure",
  other:               "Other",
};

const INSURANCE_LABELS = {
  health: "Health", life: "Life", motor: "Motor",
  home: "Home", travel: "Travel", other: "Other",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function formatAmount(a) {
  if (!a) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(a);
}

export default function SubmissionsTable() {
  const [data,        setData]        = useState([]);
  const [total,       setTotal]       = useState(0);
  const [totalPages,  setTotalPages]  = useState(1);
  const [page,        setPage]        = useState(1);
  const [search,      setSearch]      = useState("");
  const [status,      setStatus]      = useState("");
  const [complaint,   setComplaint]   = useState("");
  const [loading,     setLoading]     = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      ...(search    && { search }),
      ...(status    && { status }),
      ...(complaint && { complaintType: complaint }),
    });
    const res  = await fetch(`/api/admin/submissions?${params}`);
    const json = await res.json();
    setData(json.submissions || []);
    setTotal(json.total      || 0);
    setTotalPages(json.totalPages || 1);
    setLoading(false);
  }, [page, search, status, complaint]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Reset page when filters change
  const handleSearch    = (v) => { setSearch(v);    setPage(1); };
  const handleStatus    = (v) => { setStatus(v);    setPage(1); };
  const handleComplaint = (v) => { setComplaint(v); setPage(1); };

  const exportCSV = () => {
    const params = new URLSearchParams(status ? { status } : {});
    window.open(`/api/admin/export?${params}`, "_blank");
  };

  const selectStyle = {
    height: "40px", padding: "0 12px", borderRadius: "8px",
    border: "1px solid #d1d5db", fontSize: "13px",
    background: "#fff", color: "#374151",
  };

  return (
    <div>
      {/* ── Filters bar ─────────────────────────────────────────────── */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "10px",
        alignItems: "center", marginBottom: "20px",
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search name, mobile, ref…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "100%", height: "40px", paddingLeft: "36px", paddingRight: "12px",
              borderRadius: "8px", border: "1px solid #d1d5db",
              fontSize: "13px", color: "#374151",
            }}
          />
        </div>

        <select value={status} onChange={(e) => handleStatus(e.target.value)} style={selectStyle}>
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_review">In Review</option>
          <option value="accepted">Accepted</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select value={complaint} onChange={(e) => handleComplaint(e.target.value)} style={selectStyle}>
          <option value="">All Complaint Types</option>
          <option value="claim_rejection">Claim Rejection</option>
          <option value="delayed_claim">Delayed Claim</option>
          <option value="short_settlement">Short Settlement</option>
          <option value="mis_selling">Mis-selling</option>
          <option value="policy_cancellation">Policy Cancellation</option>
          <option value="non_disclosure">Non-disclosure</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={exportCSV}
          style={{
            height: "40px", padding: "0 16px", borderRadius: "8px",
            border: "1px solid #0d6efd", background: "#fff",
            color: "#0d6efd", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>

        <button onClick={fetchData} style={{
          height: "40px", width: "40px", borderRadius: "8px",
          border: "1px solid #d1d5db", background: "#fff",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
          </svg>
        </button>
      </div>

      {/* ── Results summary ──────────────────────────────────────────── */}
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
        {loading ? "Loading…" : `${total} submission${total !== 1 ? "s" : ""} found`}
      </p>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#1a1a2e", color: "#fff" }}>
              {["Ref #", "Name", "Mobile", "Insurer", "Type", "Complaint", "Amount", "Status", "Date", "Docs", ""].map((h) => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"
                    style={{ animation: "spin 1s linear infinite", marginBottom: "8px", display: "block", margin: "0 auto 8px" }}>
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Loading submissions…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
                  No submissions found.
                </td>
              </tr>
            ) : (
              data.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 14px", fontWeight: 600, color: "#0d6efd", whiteSpace: "nowrap" }}>
                    {s.referenceNo}
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>
                    {s.fullName}
                  </td>
                  <td style={{ padding: "12px 14px", color: "#374151", whiteSpace: "nowrap" }}>
                    <a href={`tel:${s.mobile}`} style={{ color: "#374151", textDecoration: "none" }}>{s.mobile}</a>
                  </td>
                  <td style={{ padding: "12px 14px", color: "#374151", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {s.insurerName}
                  </td>
                  <td style={{ padding: "12px 14px", color: "#6b7280", whiteSpace: "nowrap" }}>
                    {INSURANCE_LABELS[s.insuranceType] || s.insuranceType}
                  </td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      background: "#fee2e2", color: "#dc2626",
                      fontSize: "10px", padding: "2px 8px", borderRadius: "12px", fontWeight: 600,
                    }}>
                      {COMPLAINT_LABELS[s.complaintType] || s.complaintType}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", color: "#374151", whiteSpace: "nowrap", fontWeight: 500 }}>
                    {formatAmount(s.claimAmount)}
                  </td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                    <StatusBadge status={s.status} />
                  </td>
                  <td style={{ padding: "12px 14px", color: "#6b7280", whiteSpace: "nowrap" }}>
                    {formatDate(s.createdAt)}
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center", color: "#6b7280" }}>
                    {s._count.documents > 0 ? (
                      <span style={{ background: "#eff6ff", color: "#0d6efd", borderRadius: "12px", padding: "2px 8px", fontSize: "11px", fontWeight: 600 }}>
                        {s._count.documents}
                      </span>
                    ) : "—"}
                  </td>
                  <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                    <Link href={`/admin/submissions/${s.id}`} style={{
                      background: "#0d6efd", color: "#fff", padding: "5px 12px",
                      borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: 600,
                    }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ───────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #d1d5db", background: page === 1 ? "#f9fafb" : "#fff", cursor: page === 1 ? "default" : "pointer", fontSize: "13px", color: page === 1 ? "#9ca3af" : "#374151" }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #d1d5db", background: page === totalPages ? "#f9fafb" : "#fff", cursor: page === totalPages ? "default" : "pointer", fontSize: "13px", color: page === totalPages ? "#9ca3af" : "#374151" }}
          >
            Next →
          </button>
        </div>
      )}

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
    </div>
  );
}
