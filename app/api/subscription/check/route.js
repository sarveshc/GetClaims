export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ isSubscriber: false });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
      select: { isActive: true, expiresAt: true, name: true },
    });

    const isActive = subscriber?.isActive && new Date(subscriber.expiresAt) > new Date();
    return NextResponse.json({ isSubscriber: !!isActive });
  } catch {
    return NextResponse.json({ isSubscriber: false });
  }
}
