/**
 * lib/email.js — Transactional Email via ZeptoMail SMTP (nodemailer)
 *
 * Environment variables required:
 *   SMTP_HOST       smtp.zeptomail.in
 *   SMTP_PORT       587
 *   SMTP_USER       emailapikey   (literal string — ZeptoMail's fixed username)
 *   SMTP_PASS       <token from ZeptoMail dashboard>
 *   FROM_NAME       Display name (default: "GetClaims")
 *   ADMIN_EMAIL     Notification recipient (default: support@getclaims.in)
 */

import nodemailer from "nodemailer";

let _transporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  if (!_transporter) {
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    _transporter = nodemailer.createTransport({
      host:       process.env.SMTP_HOST,
      port,
      secure:     port === 465,
      requireTLS: port !== 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000,
      greetingTimeout:   5000,
      socketTimeout:     6000,
      tls: { rejectUnauthorized: true },
    });
  }
  return _transporter;
}

function FROM() {
  const name  = process.env.FROM_NAME || "GetClaims";
  const email = process.env.SMTP_FROM_EMAIL || "support@getclaims.in";
  return `"${name}" <${email}>`;
}

function ADMIN_TO() {
  return process.env.ADMIN_EMAIL || "support@getclaims.in";
}

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
  other:            "Discharge Summary / Other Documents",
};

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short",
    year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
function formatAmount(amount) {
  if (!amount) return "Not specified";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function userEmailHTML({ referenceNo, fullName, insurerName, insuranceType, complaintType, createdAt }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#0d6efd;padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700">GetClaims</h1>
            <p style="margin:6px 0 0;color:#bfdbfe;font-size:13px">We Fight For Your Rightful Insurance Claim</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 0">
            <h2 style="margin:0 0 8px;color:#1a1a2e;font-size:20px">Thank you, ${fullName}!</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6">
              We have received your claim inquiry. Our expert team will review your case and contact you within <strong>24 hours</strong>.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:2px solid #bfdbfe;border-radius:10px;margin-bottom:28px">
              <tr>
                <td style="padding:20px 24px;text-align:center">
                  <p style="margin:0 0 4px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Your Reference Number</p>
                  <p style="margin:0;color:#0d6efd;font-size:28px;font-weight:700;letter-spacing:1px">${referenceNo}</p>
                  <p style="margin:6px 0 0;color:#6b7280;font-size:12px">Save this for tracking your case</p>
                </td>
              </tr>
            </table>
            <h3 style="margin:0 0 14px;color:#1a1a2e;font-size:15px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px">Case Summary</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;width:45%">Insurance Company</td><td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${insurerName}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;font-size:13px">Type of Insurance</td><td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${INSURANCE_LABELS[insuranceType] || insuranceType}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;font-size:13px">Nature of Complaint</td><td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${COMPLAINT_LABELS[complaintType] || complaintType}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;font-size:13px">Submitted On</td><td style="padding:10px 0;color:#1a1a2e;font-size:13px;font-weight:600">${formatDate(createdAt)}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 40px">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px">
              <tr><td style="padding:18px 24px">
                <p style="margin:0 0 6px;color:#1a1a2e;font-size:13px;font-weight:600">Need urgent help?</p>
                <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6">
                  📧 <a href="mailto:support@getclaims.in" style="color:#0d6efd;text-decoration:none">support@getclaims.in</a> &nbsp;|&nbsp; 📞 +91 80468-10500
                </p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a2e;padding:20px 40px;text-align:center">
            <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.6">
              &copy; ${new Date().getFullYear()} GetClaims. All rights reserved.<br>
              Reference: <strong style="color:#60a5fa">${referenceNo}</strong>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminEmailHTML(submission) {
  const { referenceNo, fullName, mobile, email, city, state, insurerName, policyNumber,
          insuranceType, complaintType, claimAmount, description, documents, createdAt } = submission;

  const docRows = documents && documents.length > 0
    ? documents.map(doc => `
        <tr>
          <td style="padding:10px 12px;color:#6b7280;font-size:12px">${DOCTYPE_LABELS[doc.documentType] || doc.documentType}</td>
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
        <tr>
          <td style="background:#dc2626;padding:20px 32px">
            <table width="100%"><tr>
              <td>
                <p style="margin:0;color:#fee2e2;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">GetClaims Admin Alert</p>
                <h2 style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700">New Case Submission</h2>
              </td>
              <td align="right">
                <p style="margin:0;color:#fca5a5;font-size:11px">${formatDate(createdAt)}</p>
                <p style="margin:4px 0 0;color:#ffffff;font-size:18px;font-weight:700">${referenceNo}</p>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px">
              <tr style="background:#f9fafb"><td style="padding:10px 14px;color:#6b7280;font-size:12px;width:40%;border-bottom:1px solid #e5e7eb">Full Name</td><td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${fullName}</td></tr>
              <tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Mobile</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb">
                  <a href="tel:${mobile}" style="color:#0d6efd;font-size:13px;font-weight:600;text-decoration:none">${mobile}</a>
                  &nbsp;<a href="https://wa.me/91${mobile.replace(/\D/g, "")}" style="background:#25d366;color:#fff;font-size:10px;padding:2px 8px;border-radius:12px;text-decoration:none;font-weight:600">WhatsApp</a>
                </td>
              </tr>
              <tr style="background:#f9fafb"><td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb"><a href="mailto:${email}" style="color:#0d6efd;font-size:13px;text-decoration:none">${email}</a></td></tr>
              <tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;background:#f9fafb">Location</td><td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600">${city}, ${state}</td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px">
              <tr style="background:#f9fafb"><td style="padding:10px 14px;color:#6b7280;font-size:12px;width:40%;border-bottom:1px solid #e5e7eb">Insurance Company</td><td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${insurerName}</td></tr>
              <tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Policy Number</td><td style="padding:10px 14px;color:#111827;font-size:13px;border-bottom:1px solid #e5e7eb">${policyNumber || "Not provided"}</td></tr>
              <tr style="background:#f9fafb"><td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb">Insurance Type</td><td style="padding:10px 14px;color:#111827;font-size:13px;font-weight:600;border-bottom:1px solid #e5e7eb">${INSURANCE_LABELS[insuranceType] || insuranceType}</td></tr>
              <tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Complaint Type</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb">
                  <span style="background:#fee2e2;color:#dc2626;font-size:11px;padding:3px 10px;border-radius:12px;font-weight:600">${COMPLAINT_LABELS[complaintType] || complaintType}</span>
                </td>
              </tr>
              <tr style="background:#f9fafb"><td style="padding:10px 14px;color:#6b7280;font-size:12px">Claim Amount</td><td style="padding:10px 14px;color:#0d6efd;font-size:13px;font-weight:700">${formatAmount(claimAmount)}</td></tr>
            </table>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;margin-bottom:20px">
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.7;white-space:pre-wrap">${description}</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
              <tr style="background:#1a1a2e">
                <td style="padding:8px 12px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase;width:35%">Document Type</td>
                <td style="padding:8px 12px;color:#9ca3af;font-size:11px;font-weight:700;text-transform:uppercase">File</td>
              </tr>
              ${docRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a2e;padding:20px 32px;text-align:center">
            <p style="margin:0;color:#9ca3af;font-size:11px">
              GetClaims Admin — Reference: <strong style="color:#60a5fa">${referenceNo}</strong>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendAcknowledgementEmail(submission) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping acknowledgement email");
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
    console.warn("SMTP not configured — skipping admin notification email");
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
