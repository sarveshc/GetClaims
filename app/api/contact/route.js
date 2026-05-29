/**
 * /api/contact — Contact Form Submission Handler
 *
 * Receives JSON body with form data + uploaded Blob URLs.
 * 1. Validates required fields
 * 2. Generates unique reference number (GC-YYYY-XXXXX)
 * 3. Saves submission + documents to Neon Postgres via Prisma
 * 4. Sends acknowledgement email to user (Resend)
 * 5. Sends notification email to admin (Resend)
 * 6. Returns { success: true, referenceNo }
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  sendAcknowledgementEmail,
  sendAdminNotificationEmail,
} from "@/lib/email";

// ── Generate a unique human-readable reference number ──────────────────────
async function generateReferenceNo() {
  const year = new Date().getFullYear();
  let attempts = 0;

  while (attempts < 10) {
    const random = Math.floor(Math.random() * 90000) + 10000;
    const refNo = `GC-${year}-${random}`;

    // Ensure uniqueness in DB
    const exists = await prisma.contactSubmission.findUnique({
      where: { referenceNo: refNo },
    });
    if (!exists) return refNo;
    attempts++;
  }

  // Fallback: use timestamp
  return `GC-${year}-${Date.now()}`;
}

// ── Validate required fields ───────────────────────────────────────────────
function validate(body) {
  const required = {
    fullName: "Full Name",
    mobile: "Mobile Number",
    email: "Email Address",
    city: "City",
    state: "State",
    insurerName: "Insurance Company",
    insuranceType: "Type of Insurance",
    complaintType: "Nature of Complaint",
    description: "Description",
  };

  const errors = {};

  for (const [field, label] of Object.entries(required)) {
    if (!body[field] || String(body[field]).trim() === "") {
      errors[field] = `${label} is required`;
    }
  }

  // Mobile format: 10 digits
  if (body.mobile && !/^[6-9]\d{9}$/.test(body.mobile.replace(/\s/g, ""))) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number";
  }

  // Email format
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate
    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 422 }
      );
    }

    const {
      fullName, mobile, email, city, state,
      insurerName, policyNumber, insuranceType,
      complaintType, claimAmount, description,
      consent, documents = [],
    } = body;

    // Generate reference number
    const referenceNo = await generateReferenceNo();

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        referenceNo,
        fullName:      fullName.trim(),
        mobile:        mobile.replace(/\s/g, ""),
        email:         email.trim().toLowerCase(),
        city:          city.trim(),
        state:         state.trim(),
        insurerName:   insurerName.trim(),
        policyNumber:  policyNumber?.trim() || null,
        insuranceType,
        complaintType,
        claimAmount:   claimAmount ? parseFloat(claimAmount) : null,
        description:   description.trim(),
        consent:       Boolean(consent),
        status:        "new",
        // Create related document records in the same transaction
        documents: {
          create: documents.map((doc) => ({
            documentType: doc.type,       // rejection_letter | policy_doc | other
            fileName:     doc.name,
            fileUrl:      doc.url,
            fileSize:     doc.size || 0,
          })),
        },
      },
      include: { documents: true },
    });

    // Send emails — run in parallel, don't fail the request if email fails
    await Promise.allSettled([
      sendAcknowledgementEmail(submission),
      sendAdminNotificationEmail(submission),
    ]);

    return NextResponse.json({
      success: true,
      referenceNo: submission.referenceNo,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or call us directly.",
      },
      { status: 500 }
    );
  }
}
