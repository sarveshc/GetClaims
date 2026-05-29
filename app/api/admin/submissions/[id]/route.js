export const dynamic = "force-dynamic";

// GET  /api/admin/submissions/[id] — full detail
// PATCH /api/admin/submissions/[id] — update status
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const VALID_STATUSES = [
  "new", "contacted", "in_review", "accepted", "in_progress", "resolved", "closed",
];

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const submission = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
    include: { documents: { orderBy: { uploadedAt: "asc" } } },
  });

  if (!submission) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(submission);
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 422 });
  }

  const updated = await prisma.contactSubmission.update({
    where: { id: params.id },
    data:  { status, updatedAt: new Date() },
  });

  return NextResponse.json({ success: true, status: updated.status });
}
