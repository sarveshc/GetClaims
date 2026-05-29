export const dynamic = "force-dynamic";

// GET /api/admin/submissions
// Returns paginated, filtered list of all submissions (admin only)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search       = searchParams.get("search")       || "";
  const status       = searchParams.get("status")       || "";
  const complaintType= searchParams.get("complaintType")|| "";
  const page         = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit        = 20;
  const skip         = (page - 1) * limit;

  // Build Prisma where clause
  const where = {
    ...(status        && { status }),
    ...(complaintType && { complaintType }),
    ...(search && {
      OR: [
        { fullName:    { contains: search, mode: "insensitive" } },
        { mobile:      { contains: search } },
        { email:       { contains: search, mode: "insensitive" } },
        { referenceNo: { contains: search, mode: "insensitive" } },
        { insurerName: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, referenceNo: true, fullName: true, mobile: true,
        email: true, city: true, state: true, insurerName: true,
        insuranceType: true, complaintType: true, claimAmount: true,
        status: true, createdAt: true,
        _count: { select: { documents: true } },
      },
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return NextResponse.json({
    submissions,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
