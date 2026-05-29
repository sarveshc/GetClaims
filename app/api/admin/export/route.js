export const dynamic = "force-dynamic";

// GET /api/admin/export — download all submissions as CSV
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

function esc(val) {
  return `"${String(val ?? "").replace(/"/g, '""')}"`;
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const where  = status ? { status } : {};

  const submissions = await prisma.contactSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { documents: true } } },
  });

  const INSURANCE_LABELS = {
    health: "Health", life: "Life", motor: "Motor",
    home: "Home", travel: "Travel", other: "Other",
  };
  const COMPLAINT_LABELS = {
    claim_rejection: "Claim Rejection",
    delayed_claim:   "Delayed Claim",
    short_settlement:"Short Settlement",
    mis_selling:     "Mis-selling",
    policy_cancellation: "Policy Cancellation",
    non_disclosure:  "Non-disclosure",
    other:           "Other",
  };

  const headers = [
    "Reference No", "Full Name", "Mobile", "Email", "City", "State",
    "Insurance Company", "Policy Number", "Insurance Type", "Complaint Type",
    "Claim Amount (Rs.)", "Status", "Documents", "Submitted Date",
  ];

  const rows = submissions.map((s) => [
    s.referenceNo,
    s.fullName,
    s.mobile,
    s.email,
    s.city,
    s.state,
    s.insurerName,
    s.policyNumber || "",
    INSURANCE_LABELS[s.insuranceType] || s.insuranceType,
    COMPLAINT_LABELS[s.complaintType] || s.complaintType,
    s.claimAmount || "",
    s.status,
    s._count.documents,
    new Date(s.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(esc).join(","))
    .join("\r\n");

  const filename = `getclaims-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type":        "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
