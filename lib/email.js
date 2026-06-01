/**
 * lib/email.js — Transactional Email via SMTP (nodemailer)
 *
 * Configuration is driven entirely by environment variables:
 *
 *   SMTP_HOST       SMTP server hostname   (e.g. smtppro.zoho.in)
 *   SMTP_PORT       SMTP port              (587 = STARTTLS, 465 = SSL)
 *   SMTP_USER       SMTP login / from addr (e.g. support@getclaims.in)
 *   SMTP_PASS       SMTP password
 *   FROM_NAME       Display name           (default: "GetClaims")
 *   ADMIN_EMAIL     Notification recipient (default: SMTP_USER)
 *
 * The transporter is created lazily on first use so the module can be
 * imported at build time without crashing when env vars are absent.
 */

import nodemailer from "nodemailer";

// ── Lazy transporter ──────────────────────────────────────────────────────────
let _transporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null; // env vars not set — skip silently (e.g. during build)
  }

  if (!_transporter) {
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    _transporter = nodemailer.createTransport({
      host:       process.env.SMTP_HOST,
      port,
      secure:     port === 465,   // true → SSL/TLS on 465; false → STARTTLS on 587
      requireTLS: port !== 465,   // force STARTTLS upgrade on 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Zoho certificates are valid; keep this true in production
        rejectUnauthorized: true,
      },
    });
  }

  return _transporter;
}

// ── Address helpers ───────────────────────────────────────────────────────────
function FROM() {
  // Zoho enforces that FROM must match the authenticated user.
  const name  = process.env.FROM_NAME  || "GetClaims";
  const email = process.env.SMTP_USER  || "support@getclaims.in";
  return `"${name}" <${email}>`;
}

function ADMIN_TO() {
  return process.env.ADMIN_EMAIL || process.env.SMTP_USER || "support@getclaims.in";
}

// ── Label helpers ─────────────────────────────────────────────────────────────
const INSURANCE_LABELS = {
  health: "Health Insurance",
  life:   "Life Insurance",
  motor:  "Motor Insurance",
  home:   "Home Insurance",
  travel: "Travel Insurance",
  other:  "Other",
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
  other:            "Discharge Summary / Other Documents",
};

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    timeZone:  "Asia/Kolkata",
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatAmount(amount) {
  if (!amount) return "Not specified";
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(amount);
}

// ── USER ACKNOWLEDGEMENT EMAIL ────────────────────────────────────────────────
function userEmailHTML({ referenceNo, fullName, insurerName, insuranceType, complaintType, createdAt }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#0d6efd;padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px">GetClaims</h1>
            <p style="margin:6px 0 0;color:#bfdbfe;font-size:13px">We Fight For Your Rightful Insurance Claim</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 0">
            <h2 style="margin:0 0 8px;color:#1a1a2e;font-size:20px">Thank you, ${fullName}!</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6">
              We have successfully received your claim inquiry. Our expert team will review your case and contact you within <strong>24 hours</strong>.
            </p>

            <!-- Reference Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:2px solid #bfdbfe;border-radius:10px;margin-bottom:28px">
              <tr>
                <td style="padding:20px 24px;text-align:center">
                  <p style="margin:0 0 4px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Your Reference Number</p>
                  <p style="margin:0;color:#0d6efd;font-size:28px;font-weight:700;letter-spacing:1px">${referenceNo}</p>
                  <p style="margin:6px 0 0;color:#6b7280;font-size:12px">Save this for tracking your case</p>
                </td>
              </tr>
            </table>

            <!-- Case Summary -->
            <h3 style="margin:0 0 14px;color:#1a1a2e;font-size:15px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px">Case Summary</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr style="border-bottom:1px solid #f3f4f6">
                <td style="padding:10px 0;color:#6b7280;font-size:13px;width:45%">Insurance Company</td>
                <td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${insurerName}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6">
                <td style="padding:10px 0;color:#6b7280;font-size:13px">Type of Insurance</td>
                <td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${INSURANCE_LABELS[insuranceType] || insuranceType}</td>
              </tr>
              <tr style="border-bottom:1px solid #f3f4f6">
                <td style="padding:10px 0;color:#6b7280;font-size:13px">Nature of Complaint</td>
                <td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${COMPLAINT_LABELS[complaintType] || complaintType}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;font-size:13px">Submitted On</td>
                <td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${formatDate(createdAt)}</td>
              </tr>
            </table>

            <!-- Next Steps -->
            <h3 style="margin:0 0 14px;color:#1a1a2e;font-size:15px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px">What Happens Next</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr>
                <td style="vertical-align:top;width:32px">
                  <div style="width:26px;height:26px;background:#0d6efd;border-radius:50%;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:26px">1</div>
                </td>
                <td style="padding:2px 0 14px 12px;color:#374151;font-size:13px;line-height:1.5">
                  <strong>Expert Review</strong><br>Our insurance experts review your case documents and merit within 2 hours.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top">
                  <div style="width:26px;height:26px;background:#0d6efd;border-radius:50%;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:26px">2</div>
                </td>
                <td style="padding:2px 0 14px 12px;color:#374151;font-size:13px;line-height:1.5">
                  <strong>Initial Consultation</strong><br>Our team calls you to discuss the best legal and IRDAI-backed course of action.
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top">
                  <div style="width:26px;height:26px;background:#0d6efd;border-radius:50%;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:26px">3</div>
                </td>
                <td style="padding:2px 0 0 12px;color:#374151;font-size:13px;line-height:1.5">
                  <strong>We Fight For You</strong><br>If accepted, GetClaims handles everything — IRDAI complaint, insurer follow-up, resolution.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact Bar -->
        <tr>
          <td style="padding:0 40px 40px">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px">
              <tr>
                <td style="padding:18px 24px">
                  <p style="margin:0 0 6px;color:#1a1a2e;font-size:13px;font-weight:600">Need urgent help?</p>
                  <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6">
                    📧 Email: <a href="mailto:support@getclaims.in" style="color:#0d6efd;text-decoration:none">support@getclaims.in</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a2e;padding:20px 40px;text-align:center">
            <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.6">
              &copy; ${new Date().getFullYear()} GetClaims. All rights reserved.<br>
              This email was sent because you submitted a claim inquiry on getclaims.in.<br>
              Your reference number: <strong style="color:#60a5fa">${referenceNo}</strong>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── ADMIN NOTIFICATION EMAIL ──────────────────────────────────────────────────
function adminEmailHTML(submission) {
  const {
    referenceNo, fullName, mobile, email, city, state,
    insurerName, policyNumber, insuranceType, complaintType,
    claimAmount, description, documents, createdAt,
  } = submission;

  const docRows = documents && documents.length > 0
    ? documents.map(doc => `
        <tr style="border-bottom:1px solid #f3f4f6">
          <td style="padding:10px 12px;color:#6b7280;font-size:12px;white-space:nowrap">${DOCTYPE_LABELS[doc.documentType] || doc.documentType}</td>
          <td style="padding:10px 12px;font-size:12px">
            <a href="${doc.fileUrl}" style="color:#0d6efd;text-decoration:none" target="_blank">${doc.fileName}</a>
            <span style="color:#9ca3af;font-size:11px;margin-left:6px">(${(doc.fileSize / 1024).toFixed(0)} KB)</span>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="2" style="padding:10px 12px;color:#9ca3af;font-size:12px">No documents uploaded</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 0">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#dc2626;padding:20px 32px">
            <table width="100%">
              <tr>
                <td>
                  <p style="margin:0;color:#fee2e2;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">GetClaims Admin Alert</p>
                  <h2 style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700">New Case Submission</h2>
                </td>
                <td align="right">
                  <p style="margin:0;color:#fca5a5;font-size:11px">${formatDate(createdAt)}</p>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:18px;font-weight:700">${referenceNo}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px 0">

            <!-- Personal Details -->
            <h3 style="margin:0 0 12px;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Personal Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;width:40%;border-bottom:1px solid #e5e7eb">Full Name</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Mobile</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb">
                  <a href="tel:${mobile}" style="color:#0d6efd;font-size:13px;font-weight:600;text-decoration:none">${mobile}</a>
                  &nbsp;
                  <a href="https://wa.me/91${mobile.replace(/\D/g, "")}" style="background:#25d366;color:#fff;font-size:10px;padding:2px 8px;border-radius:12px;text-decoration:none;font-weight:600">WhatsApp</a>
                </td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb">Email</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb">
                  <a href="mailto:${email}" style="color:#0d6efd;font-size:13px;text-decoration:none">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;background:#f9fafb">Location</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600">${city}, ${state}</td>
              </tr>
            </table>

            <!-- Claim Details -->
            <h3 style="margin:0 0 12px;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Claim Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;width:40%;border-bottom:1px solid #e5e7eb">Insurance Company</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${insurerName}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Policy Number</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;border-bottom:1px solid #e5e7eb">${policyNumber || "Not provided"}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb">Insurance Type</td>
                <td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${INSURANCE_LABELS[insuranceType] || insuranceType}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Nature of Complaint</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb">
                  <span style="background:#fee2e2;color:#dc2626;font-size:11px;padding:3px 10px;border-radius:12px;font-weight:600">${COMPLAINT_LABELS[complaintType] || complaintType}</span>
                </td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-size:12px">Claim Amount</td>
                <td style="padding:10px 14px;color:#0d6efd;font-size:13px;font-weight:700">${formatAmount(claimAmount)}</td>
              </tr>
            </table>

            <!-- Description -->
            <h3 style="margin:0 0 12px;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Description</h3>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;margin-bottom:20px">
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.7;white-space:pre-wrap">${description}</p>
            </div>

            <!-- Documents -->
            <h3 style="margin:0 0 12px;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Uploaded Documents</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px">
              <tr style="background:#1a1a2e">
                <td style="padding:8px 12px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;width:35%">Document Type</td>
                <td style="padding:8px 12px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase">File</td>
              </tr>
              ${docRows}
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a2e;padding:20px 32px;text-align:center">
            <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.6">
              GetClaims Admin Notification — Reference: <strong style="color:#60a5fa">${referenceNo}</strong><br>
              Log in to your admin dashboard to update case status.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── EXPORTED SEND FUNCTIONS ───────────────────────────────────────────────────

export async function sendAcknowledgementEmail(submission) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping acknowledgement email (set SMTP_HOST, SMTP_USER, SMTP_PASS)");
    return { success: false };
  }

  try {
    const info = await transporter.sendMail({
      from:    FROM(),
      to:      submission.email,
      subject: `Your Claim Inquiry Received — Ref# ${submission.referenceNo} | GetClaims`,
      html:    userEmailHTML(submission),
    });
    console.log("Acknowledgement email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("sendAcknowledgementEmail error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function sendAdminNotificationEmail(submission) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping admin notification email (set SMTP_HOST, SMTP_USER, SMTP_PASS)");
    return { success: false };
  }

  try {
    const info = await transporter.sendMail({
      from:     FROM(),
      to:       ADMIN_TO(),
      replyTo:  submission.email,
      subject:  `New Case — ${submission.fullName} | ${COMPLAINT_LABELS[submission.complaintType] || submission.complaintType} | ${submission.referenceNo}`,
      html:     adminEmailHTML(submission),
    });
    console.log("Admin notification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("sendAdminNotificationEmail error:", err.message);
    return { success: false, error: err.message };
  }
}
