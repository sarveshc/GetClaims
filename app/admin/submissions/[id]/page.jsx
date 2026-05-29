// Submission Detail Page (Server Component)
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import Link                 from "next/link";
import { authOptions }      from "@/lib/auth";
import prisma               from "@/lib/prisma";
import StatusBadge          from "@/components/admin/StatusBadge";
import UpdateStatus         from "@/components/admin/UpdateStatus";

const INSURANCE_LABELS = {
  health: "Health Insurance", life: "Life Insurance", motor: "Motor Insurance",
  home: "Home Insurance", travel: "Travel Insurance", other: "Other",
};
const COMPLAINT_LABELS = {
  claim_rejection:     "Claim Rejection",
  delayed_claim:       "Delayed Claim Processing",
  short_settlement:    "Short / Partial Settlement",
  mis_selling:         "Mis-selling of Policy",
  policy_cancellation: "Policy Cancellation / Refund",
  non_disclosure:      "Non-disclosure Rejection",
  other:               "Other",
};
const DOCTYPE_LABELS = {
  rejection_letter: "Claim Rejection Letter",
  policy_doc:       "Policy Document",
  other:            "Discharge Summary / Other",
};

function formatDate(d) {
  return new Date(d).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short",
    year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
function formatAmount(a) {
  if (!a) return "Not specified";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(a);
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #f3f4f6", padding: "10px 0" }}>
      <span style={{ width: "45%", fontSize: "12px", color: "#6b7280", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: "13px", color: "#111827", fontWeight: 500, wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "12px",
      border: "1px solid #e5e7eb", overflow: "hidden", marginBottom: "20px",
    }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}>
        <h3 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px" }}>
          {title}
        </h3>
      </div>
      <div style={{ padding: "6px 20px 16px" }}>{children}</div>
    </div>
  );
}

export default async function SubmissionDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const submission = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
    include: { documents: { orderBy: { uploadedAt: "asc" } } },
  });

  if (!submission) notFound();

  const docTypeIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d6efd" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
      <polyline points="14 2 14 8 20 8" fill="none" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  );

  return (
    <div style={{ padding: "32px" }}>

      {/* ── Back + Header ─────────────────────────────────────────────── */}
      <Link href="/admin/submissions" style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "#6b7280", fontSize: "13px", textDecoration: "none", marginBottom: "20px",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Submissions
      </Link>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#1a1a2e" }}>
              {submission.fullName}
            </h1>
            <StatusBadge status={submission.status} size="lg" />
          </div>
          <p style={{ margin: 0, fontSize: "14px", color: "#0d6efd", fontWeight: 600 }}>
            {submission.referenceNo}
            <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: "12px" }}>
              Submitted {formatDate(submission.createdAt)}
            </span>
          </p>
        </div>

        {/* Quick contact links */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a href={`tel:${submission.mobile}`} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#0d6efd", color: "#fff", padding: "8px 16px",
            borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.58 9.83a19.79 19.79 0 01-3.07-8.67A2 2 0 012.49 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.94a16 16 0 006.15 6.15l1.3-1.3a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call
          </a>
          <a href={`https://wa.me/91${submission.mobile.replace(/\D/g, "")}?text=Hi ${submission.fullName}, this is GetClaims team. Regarding your case ${submission.referenceNo}.`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "#25d366", color: "#fff", padding: "8px 16px",
              borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
            }}>
            WhatsApp
          </a>
          <a href={`mailto:${submission.email}`} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#fff", color: "#374151", padding: "8px 16px",
            borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
            border: "1px solid #d1d5db",
          }}>
            Email
          </a>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", alignItems: "start" }}>

        {/* Left column */}
        <div>
          <Card title="Personal Details">
            <InfoRow label="Full Name"    value={submission.fullName} />
            <InfoRow label="Mobile"       value={submission.mobile} />
            <InfoRow label="Email"        value={submission.email} />
            <InfoRow label="Location"     value={`${submission.city}, ${submission.state}`} />
          </Card>

          <Card title="Claim Details">
            <InfoRow label="Insurance Company" value={submission.insurerName} />
            <InfoRow label="Policy Number"     value={submission.policyNumber || "Not provided"} />
            <InfoRow label="Insurance Type"    value={INSURANCE_LABELS[submission.insuranceType] || submission.insuranceType} />
            <InfoRow label="Nature of Complaint" value={COMPLAINT_LABELS[submission.complaintType] || submission.complaintType} />
            <InfoRow label="Claim Amount"      value={formatAmount(submission.claimAmount)} />
          </Card>

          <Card title="Description">
            <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
              {submission.description}
            </p>
          </Card>

          <Card title={`Documents (${submission.documents.length})`}>
            {submission.documents.length === 0 ? (
              <p style={{ margin: "10px 0 0", fontSize: "13px", color: "#9ca3af" }}>No documents uploaded.</p>
            ) : (
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {submission.documents.map((doc) => (
                  <div key={doc.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: "8px", padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                      {docTypeIcon}
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {DOCTYPE_LABELS[doc.documentType] || doc.documentType}
                        </p>
                        <p style={{ margin: 0, fontSize: "13px", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {doc.fileName}
                        </p>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#9ca3af" }}>
                          {(doc.fileSize / 1024).toFixed(0)} KB • {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={doc.fileName}
                      style={{
                        flexShrink: 0, marginLeft: "12px",
                        display: "flex", alignItems: "center", gap: "6px",
                        background: "#eff6ff", color: "#0d6efd",
                        padding: "6px 14px", borderRadius: "6px",
                        textDecoration: "none", fontSize: "12px", fontWeight: 600,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right column */}
        <div>
          <UpdateStatus submissionId={submission.id} currentStatus={submission.status} />

          {/* Meta info card */}
          <div style={{
            background: "#fff", borderRadius: "12px", padding: "20px",
            border: "1px solid #e5e7eb", marginTop: "16px",
          }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.8px" }}>
              Case Info
            </h3>
            {[
              { label: "Reference",  value: submission.referenceNo },
              { label: "Submitted",  value: formatDate(submission.createdAt) },
              { label: "Last Updated", value: formatDate(submission.updatedAt) },
              { label: "Consent",    value: submission.consent ? "✅ Given" : "❌ Not given" },
              { label: "Documents",  value: `${submission.documents.length} file(s)` },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: "1px solid #f3f4f6", padding: "8px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>{label}</span>
                <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
