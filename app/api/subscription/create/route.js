export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const AMOUNT_PAISE = 49900; // ₹499

export async function POST(request) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Payment gateway not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone } = body;
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Name, email and phone are required." }, { status: 422 });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: AMOUNT_PAISE,
      currency: "INR",
      receipt: `sub_${Date.now()}`,
      notes: { name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("[subscription/create]", err);
    return NextResponse.json({ error: "Could not create payment order. Please try again." }, { status: 500 });
  }
}
