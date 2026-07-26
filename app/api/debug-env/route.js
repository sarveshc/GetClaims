export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

async function testSmtp() {
  try {
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
    });
    await transporter.verify();
    return "✅ Connected successfully";
  } catch (err) {
    return `❌ Failed: ${err.message}`;
  }
}

async function testDb() {
  try {
    const count = await prisma.contactSubmission.count();
    const withDocs = await prisma.contactSubmission.count({
      where: { documents: { some: {} } },
    });
    return { total_submissions: count, submissions_with_documents: withDocs };
  } catch (err) {
    return `❌ DB error: ${err.message}`;
  }
}

export async function GET() {
  const [smtpResult, dbResult] = await Promise.all([testSmtp(), testDb()]);

  return Response.json({
    smtp_connection: smtpResult,
    database: dbResult,
  });
}
