import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Follow a user
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let followingId: string;
    try {
      const body = await req.json();
      followingId = body.followingId;
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (!followingId) {
      return NextResponse.json({ error: "followingId is required" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (currentUser.id === followingId) {
      return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
    }

    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Already following" }, { status: 400 });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: currentUser.id,
        followingId,
      },
    });

    return NextResponse.json(follow, { status: 201 });

  } catch (error) {
    console.error("POST /api/follow error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Unfollow a user
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let followingId: string;
  try {
    const body = await req.json();
    followingId = body.followingId;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!followingId) {
    return NextResponse.json({ error: "followingId is required" }, { status: 400 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId,
        },
      },
    });
  } catch {
    return NextResponse.json({ error: "Follow relationship not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Unfollowed successfully" });
}