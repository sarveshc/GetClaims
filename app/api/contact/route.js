export const dynamic = "force-dynamic";

/**
 * /api/contact — Contact Form Submission Handler
 *
 * 1. Validates required fields
 * 2. Generates unique reference number (GC-YYYY-XXXXX)
 * 3. Saves submission + documents to Neon Postgres via Prisma
 * 4. Fires emails (max 7s window) — does NOT block success response
 * 5. Returns { success: true, referenceNo }
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  sendAcknowledgementEmail,
  sendAdminNotificationEmail,
} from "@/lib/email";

// ── Validate required fields ───────────────────────────────────────────────
function validate(body) {
  const required = {
    fullName:     "Full Name",
    mobile:       "Mobile Number",
    email:        "Email Address",
    city:         "City",
    state:        "State",
    insurerName:  "Insurance Company",
    insuranceType:"Type of Insurance",
    complaintType:"Nature of Complaint",
    description:  "Description",
  };

  const errors = {};
  for (const [field, label] of Object.entries(required)) {
    if (!body[field] || String(body[field]).trim() === "") {
      errors[field] = `${label} is required`;
    }
  }
  if (body.mobile && !/^[6-9]\d{9}$/.test(body.mobile.replace(/\s/g, "")))
    errors.mobile = "Enter a valid 10-digit Indian mobile number";
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.email = "Enter a valid email address";

  return errors;
}

// ── Generate unique reference number ──────────────────────────────────────
async function generateReferenceNo() {
  const year = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    const n    = Math.floor(Math.random() * 90000) + 10000;
    const ref  = `GC-${year}-${n}`;
    const exists = await prisma.contactSubmission.findUnique({ where: { referenceNo: ref } });
    if (!exists) return ref;
  }
  return `GC-${year}-${Date.now()}`;
}

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  // ── Guard: DATABASE_URL must be set ────────────────────────────────────
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return NextResponse.json(
      { success: false, error: "Database is not configured. Please contact support@getclaims.in directly." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // ── Validate ────────────────────────────────────────────────────────────
  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  const {
    fullName, mobile, email, city, state,
    insurerName, policyNumber, insuranceType,
    complaintType, claimAmount, description,
    consent, documents = [],
  } = body;

  // ── Save to database ────────────────────────────────────────────────────
  let submission;
  try {
    const referenceNo = await generateReferenceNo();

    submission = await prisma.contactSubmission.create({
      data: {
        referenceNo,
        fullName:     fullName.trim(),
        mobile:       mobile.replace(/\s/g, ""),
        email:        email.trim().toLowerCase(),
        city:         city.trim(),
        state:        state.trim(),
        insurerName:  insurerName.trim(),
        policyNumber: policyNumber?.trim() || null,
        insuranceType,
        complaintType,
        claimAmount:  claimAmount ? parseFloat(claimAmount) : null,
        description:  description.trim(),
        consent:      Boolean(consent),
        status:       "new",
        documents: {
          create: documents.map((doc) => ({
            documentType: doc.type,
            fileName:     doc.name,
            fileUrl:      doc.url,
            fileSize:     doc.size || 0,
          })),
        },
      },
      include: { documents: true },
    });
  } catch (dbError) {
    console.error("Database error:", dbError.message);
    return NextResponse.json(
      { success: false, error: "Could not save your submission. Please try again or call us directly." },
      { status: 500 }
    );
  }

  // ── Send emails — race against a 7s timeout so we never block the response
  // Vercel serverless functions have a 10s limit; DB save uses ~2-3s already.
  const emailDeadline = new Promise((resolve) => setTimeout(resolve, 7000));
  Promise.race([
    Promise.allSettled([
      sendAcknowledgementEmail(submission),
      sendAdminNotificationEmail(submission),
    ]),
    emailDeadline,
  ]).catch((err) => console.error("Email dispatch error:", err));
  // Note: deliberately NOT awaiting — response goes out immediately after DB save

  return NextResponse.json({
    success:     true,
    referenceNo: submission.referenceNo,
  });
}
