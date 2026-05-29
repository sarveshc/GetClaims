// Submissions List Page (Server Component shell + Client Table)
import { getServerSession } from "next-auth/next";
import { redirect }         from "next/navigation";
import { authOptions }      from "@/lib/auth";
import SubmissionsTable     from "@/components/admin/SubmissionsTable";

export const metadata = { title: "Submissions | GetClaims Admin" };

export default async function SubmissionsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 800, color: "#1a1a2e" }}>
          Submissions
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
          All contact form submissions from getclaims.in
        </p>
      </div>

      <SubmissionsTable />
    </div>
  );
}
