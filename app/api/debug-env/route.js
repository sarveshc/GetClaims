export const dynamic = "force-dynamic";

import { Resend } from "resend";
import prisma from "@/lib/prisma";

async function testResend() {
  if (!process.env.RESEND_API_KEY) return "❌ RESEND_API_KEY not set";
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from:    "GetClaims <support@getclaims.in>",
      to:      [process.env.ADMIN_EMAIL || "support@getclaims.in"],
      subject: "GetClaims — Email Test",
      html:    "<p>Email system is working correctly via Resend.</p>",
    });
    if (error) return `❌ Resend error: ${error.message}`;
    return `✅ Test email sent (id: ${data.id})`;
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
  const [emailResult, dbResult] = await Promise.all([testResend(), testDb()]);

  return Response.json({
    email: emailResult,
    database: dbResult,
  });
}
