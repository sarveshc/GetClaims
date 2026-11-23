export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, name, email, phone } = body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return NextResponse.json({ success: false, error: "Missing payment details." }, { status: 422 });
  }

  // Verify HMAC signature
  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSig !== razorpay_signature) {
    console.error("[subscription/verify] Signature mismatch");
    return NextResponse.json({ success: false, error: "Payment verification failed." }, { status: 400 });
  }

  // Store subscriber — expires 6 months from now (1-case plan)
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 6);

  try {
    await prisma.subscriber.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        name: name.trim(),
        phone: phone?.trim() || null,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        subscribedAt: new Date(),
        expiresAt,
        isActive: true,
      },
      create: {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        phone: phone?.trim() || null,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        expiresAt,
      },
    });
    console.log(`[subscription/verify] Subscriber saved: ${email}`);
  } catch (dbErr) {
    console.error("[subscription/verify] DB error:", dbErr.message);
    return NextResponse.json({ success: false, error: "Payment received but could not save subscription. Contact support@getclaims.in." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
