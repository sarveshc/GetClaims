export const dynamic = "force-dynamic";

function check(val) {
  if (!val) return "❌ NOT SET";
  if (val.startsWith('"') || val.startsWith("'")) return "⚠️ SET but starts with quote character";
  if (val !== val.trim()) return "⚠️ SET but has leading/trailing whitespace";
  return "✅ SET";
}

export async function GET() {
  return Response.json({
    auth: {
      ADMIN_EMAIL:     check(process.env.ADMIN_EMAIL),
      ADMIN_PASSWORD:  check(process.env.ADMIN_PASSWORD),
      NEXTAUTH_SECRET: check(process.env.NEXTAUTH_SECRET),
      NEXTAUTH_URL:    process.env.NEXTAUTH_URL || "❌ NOT SET",
    },
    smtp: {
      SMTP_HOST: check(process.env.SMTP_HOST),
      SMTP_PORT: process.env.SMTP_PORT || "❌ NOT SET",
      SMTP_USER: check(process.env.SMTP_USER),
      SMTP_PASS: check(process.env.SMTP_PASS),
      FROM_NAME: check(process.env.FROM_NAME),
    },
    storage: {
      BLOB_READ_WRITE_TOKEN: check(process.env.BLOB_READ_WRITE_TOKEN),
      DATABASE_URL:          check(process.env.DATABASE_URL),
    },
  });
}
