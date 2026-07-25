export const dynamic = "force-dynamic";

function inspect(val) {
  if (!val) return { set: false };
  return {
    set: true,
    length: val.length,
    trimmedLength: val.trim().length,
    hasLeadingSpace: val !== val.trimStart(),
    hasTrailingSpace: val !== val.trimEnd(),
    startsWithQuote: val.startsWith('"') || val.startsWith("'"),
    endsWithQuote: val.endsWith('"') || val.endsWith("'"),
  };
}

export async function GET() {
  return Response.json({
    ADMIN_EMAIL:     inspect(process.env.ADMIN_EMAIL),
    ADMIN_PASSWORD:  inspect(process.env.ADMIN_PASSWORD),
    NEXTAUTH_SECRET: { set: !!process.env.NEXTAUTH_SECRET },
    NEXTAUTH_URL:    process.env.NEXTAUTH_URL || "NOT SET",
  });
}
