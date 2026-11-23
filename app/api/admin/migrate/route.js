import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Subscriber" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "phone" TEXT,
        "razorpayPaymentId" TEXT NOT NULL,
        "razorpayOrderId" TEXT NOT NULL,
        "amountPaise" INTEGER NOT NULL DEFAULT 49900,
        "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
      )
    `);

    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_razorpayPaymentId_key" ON "Subscriber"("razorpayPaymentId")
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_razorpayOrderId_key" ON "Subscriber"("razorpayOrderId")
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Subscriber_email_idx" ON "Subscriber"("email")
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Subscriber_expiresAt_idx" ON "Subscriber"("expiresAt")
    `);

    return NextResponse.json({ success: true, message: "Subscriber table created" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
