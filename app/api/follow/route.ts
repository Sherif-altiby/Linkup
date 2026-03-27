// app/api/follow/route.ts

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id;
    const { targetUserId } = await req.json();

    if (!targetUserId) {
      return NextResponse.json({ error: "Target User ID is required" }, { status: 400 });
    }

    if (currentUserId === targetUserId) {
      return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
    }

    // Check if follow already exists
    const existingFollow = await prisma.follow.findFirst({
      where: { followerId: currentUserId, followingId: targetUserId },
    });

    let isFollowing;

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({ where: { id: existingFollow.id } });
      isFollowing = false;
    } else {
      // Follow
      await prisma.follow.create({
        data: { followerId: currentUserId, followingId: targetUserId },
      });
      isFollowing = true;
    }

    // 👇 Debug: show all follow records in terminal
    const allFollows = await prisma.follow.findMany();
    console.log("ALL FOLLOWS:", allFollows);

    // Get updated counts
    const counts = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        _count: {
          select: { followers: true, following: true },
        },
      },
    });

    return NextResponse.json({
      isFollowing,
      followersCount: counts?._count.followers,
      followingCount: counts?._count.following,
    });
  } catch (error) {
    console.error("FOLLOW ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}