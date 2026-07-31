export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const REQUIRED_VARS = {
  "Database":     ["DATABASE_URL"],
  "Auth":         ["NEXTAUTH_SECRET", "NEXTAUTH_URL", "ADMIN_EMAIL", "ADMIN_PASSWORD"],
  "Email (SMTP)": ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM_EMAIL", "FROM_NAME"],
  "S3 Upload":    ["S3_REGION", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY", "S3_BUCKET"],
};

function checkEnvVars() {
  const result = {};
  for (const [group, vars] of Object.entries(REQUIRED_VARS)) {
    result[group] = {};
    for (const v of vars) {
      const val = process.env[v];
      result[group][v] = val ? `✅ SET (${val.length} chars)` : "❌ MISSING";
    }
  }
  return result;
}

async function testSmtp() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return "❌ SMTP env vars missing — skipped";
  try {
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 5000, greetingTimeout: 5000,
    });
    await transporter.verify();
    return "✅ Connected successfully";
  } catch (err) {
    return `❌ Failed: ${err.message}`;
  }
}

async function testDb() {
  if (!process.env.DATABASE_URL) return "❌ DATABASE_URL missing — skipped";
  try {
    const count    = await prisma.contactSubmission.count();
    const withDocs = await prisma.contactSubmission.count({ where: { documents: { some: {} } } });
    return { status: "✅ Connected", total_submissions: count, with_documents: withDocs };
  } catch (err) {
    return `❌ DB error: ${err.message}`;
  }
}

export async function GET() {
  const [smtpResult, dbResult] = await Promise.all([testSmtp(), testDb()]);

  return Response.json({
    env_vars:    checkEnvVars(),
    smtp_test:   smtpResult,
    db_test:     dbResult,
    nextauth_url: process.env.NEXTAUTH_URL || "❌ NOT SET",
  });
}
