export const dynamic = "force-dynamic";
// Admin Dashboard — Stats Overview (Server Component)
import { getServerSession } from "next-auth/next";
import { redirect }         from "next/navigation";
import { authOptions }      from "@/lib/auth";
import prisma               from "@/lib/prisma";

function StatCard({ label, value, sub, color = "#0d6efd", bg = "#eff6ff" }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "12px", padding: "24px",
      border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: "32px", fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#9ca3af" }}>{sub}</p>}
    </div>
  );
}

const COMPLAINT_LABELS = {
  claim_rejection:     "Claim Rejection",
  delayed_claim:       "Delayed Claim",
  short_settlement:    "Short Settlement",
  mis_selling:         "Mis-selling",
  policy_cancellation: "Policy Cancellation",
  non_disclosure:      "Non-disclosure",
  other:               "Other",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function formatAmount(a) {
  if (!a) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(a);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // Fetch all stats in one parallel call
  const [
    totalCount, newCount, contactedCount, inReviewCount,
    acceptedCount, inProgressCount, resolvedCount,
    amountAgg, recentSubmissions,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count({ where: { status: "contacted" } }),
    prisma.contactSubmission.count({ where: { status: "in_review" } }),
    prisma.contactSubmission.count({ where: { status: "accepted" } }),
    prisma.contactSubmission.count({ where: { status: "in_progress" } }),
    prisma.contactSubmission.count({ where: { status: "resolved" } }),
    prisma.contactSubmission.aggregate({ _sum: { claimAmount: true }, _avg: { claimAmount: true } }),
    prisma.contactSubmission.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, referenceNo: true, fullName: true, mobile: true,
        complaintType: true, claimAmount: true, status: true, createdAt: true,
      },
    }),
  ]);

  const totalAmount = amountAgg._sum.claimAmount || 0;
  const avgAmount   = amountAgg._avg.claimAmount || 0;
  const activeCount = contactedCount + inReviewCount + acceptedCount + inProgressCount;

  const STATUS_CONFIG = {
    new:          { bg: "#dbeafe", color: "#1d4ed8", label: "New" },
    contacted:    { bg: "#ffedd5", color: "#c2410c", label: "Contacted" },
    in_review:    { bg: "#fef9c3", color: "#854d0e", label: "In Review" },
    accepted:     { bg: "#ede9fe", color: "#6d28d9", label: "Accepted" },
    in_progress:  { bg: "#e0e7ff", color: "#3730a3", label: "In Progress" },
    resolved:     { bg: "#dcfce7", color: "#15803d", label: "Resolved" },
    closed:       { bg: "#f3f4f6", color: "#4b5563", label: "Closed" },
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 800, color: "#1a1a2e" }}>
          Dashboard
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
          Welcome back! Here's what's happening with GetClaims today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard label="Total Cases"     value={totalCount}  sub="All time submissions" />
        <StatCard label="New"             value={newCount}    sub="Awaiting review"   color="#1d4ed8" bg="#dbeafe" />
        <StatCard label="Active"          value={activeCount} sub="In pipeline"        color="#6d28d9" bg="#ede9fe" />
        <StatCard label="Resolved"        value={resolvedCount} sub="Successfully closed" color="#15803d" bg="#dcfce7" />
      </div>

      {/* Amount Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard
          label="Total Claim Value"
          value={formatAmount(totalAmount)}
          sub="Sum of all submitted claims"
          color="#0d6efd"
        />
        <StatCard
          label="Avg. Claim Amount"
          value={formatAmount(avgAmount)}
          sub="Per submission average"
          color="#0d6efd"
        />
      </div>

      {/* Status Breakdown */}
      <div style={{
        background: "#fff", borderRadius: "12px", padding: "24px",
        border: "1px solid #e5e7eb", marginBottom: "32px",
      }}>
        <h2 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700, color: "#1a1a2e" }}>
          Status Breakdown
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {[
            { key: "new",         count: newCount },
            { key: "contacted",   count: contactedCount },
            { key: "in_review",   count: inReviewCount },
            { key: "accepted",    count: acceptedCount },
            { key: "in_progress", count: inProgressCount },
            { key: "resolved",    count: resolvedCount },
          ].map(({ key, count }) => {
            const cfg = STATUS_CONFIG[key];
            return (
              <div key={key} style={{
                background: cfg.bg, borderRadius: "10px", padding: "12px 18px",
                minWidth: "100px", textAlign: "center",
              }}>
                <p style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 800, color: cfg.color }}>{count}</p>
                <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: cfg.color }}>{cfg.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Submissions */}
      <div style={{
        background: "#fff", borderRadius: "12px",
        border: "1px solid #e5e7eb", overflow: "hidden",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#1a1a2e" }}>
            Recent Submissions
          </h2>
          <a href="/admin/submissions" style={{ fontSize: "13px", color: "#0d6efd", textDecoration: "none", fontWeight: 600 }}>
            View all →
          </a>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Ref #", "Name", "Mobile", "Complaint", "Amount", "Status", "Date", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>
                    No submissions yet. They will appear here once users submit the contact form.
                  </td>
                </tr>
              ) : (
                recentSubmissions.map((s, i) => {
                  const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG.new;
                  return (
                    <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0d6efd", whiteSpace: "nowrap" }}>{s.referenceNo}</td>
                      <td style={{ padding: "12px 16px", fontWeight: 500, color: "#111827" }}>{s.fullName}</td>
                      <td style={{ padding: "12px 16px", color: "#374151" }}>
                        <a href={`tel:${s.mobile}`} style={{ color: "#374151", textDecoration: "none" }}>{s.mobile}</a>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "10px", padding: "2px 8px", borderRadius: "12px", fontWeight: 600 }}>
                          {COMPLAINT_LABELS[s.complaintType] || s.complaintType}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#374151", fontWeight: 500 }}>{formatAmount(s.claimAmount)}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: cfg.bg, color: cfg.color, fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontWeight: 700 }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#6b7280", whiteSpace: "nowrap" }}>{formatDate(s.createdAt)}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <a href={`/admin/submissions/${s.id}`} style={{ background: "#eff6ff", color: "#0d6efd", padding: "4px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
