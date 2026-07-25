export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ADMIN_EMAIL_set:      !!process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_set:   !!process.env.ADMIN_PASSWORD,
    NEXTAUTH_SECRET_set:  !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL:         process.env.NEXTAUTH_URL || "NOT SET",
  });
}
