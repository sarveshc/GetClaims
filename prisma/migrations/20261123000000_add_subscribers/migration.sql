-- CreateTable: Subscriber (annual membership ₹499/year)
CREATE TABLE "Subscriber" (
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
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
CREATE UNIQUE INDEX "Subscriber_razorpayPaymentId_key" ON "Subscriber"("razorpayPaymentId");
CREATE UNIQUE INDEX "Subscriber_razorpayOrderId_key" ON "Subscriber"("razorpayOrderId");
CREATE INDEX "Subscriber_email_idx" ON "Subscriber"("email");
CREATE INDEX "Subscriber_expiresAt_idx" ON "Subscriber"("expiresAt");
