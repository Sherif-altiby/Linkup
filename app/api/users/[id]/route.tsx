import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // target user ID (Joseph)

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // Get user info
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        location: true,
        phone: true,
        birthDate: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Check if current user follows this user
    let isFollowing = false;
    if (currentUserId) {
      const follow = await prisma.follow.findFirst({
        where: {
          followerId: currentUserId,
          followingId: id,
        },
      });
      isFollowing = !!follow;
    }

    return NextResponse.json({
      ...user,
      isFollowing,
    });
  } catch (error) {
    console.error("PROFILE API ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}