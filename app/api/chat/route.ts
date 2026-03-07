import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// GET — fetch conversations OR message history
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const senderId = searchParams.get("senderId");
  const receiverId = searchParams.get("receiverId");

  // If no params → return conversations list
  if (!senderId && !receiverId) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json([], { status: 401 });

    const currentUserId = session.user.id;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId },
          { receiverId: currentUserId },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Extract unique users
    const usersMap = new Map();
    messages.forEach((msg) => {
      const otherUser =
        msg.senderId === currentUserId ? msg.receiver : msg.sender;

      if (!usersMap.has(otherUser.id)) {
        usersMap.set(otherUser.id, {
          ...otherUser,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          online: false,
        });
      }
    });

    return NextResponse.json(Array.from(usersMap.values()));
  }

  // If params → return message history between two users
  if (!senderId || !receiverId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    include: { sender: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

// POST — save new message
export async function POST(req: NextRequest) {
  const { content, senderId, receiverId } = await req.json();

  if (!content || !senderId || !receiverId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { content, senderId, receiverId },
    include: { sender: true },
  });

  return NextResponse.json(message);
}




// GET /api/chat              → returns conversations list
// GET /api/chat?senderId=x&receiverId=y  → returns message history
// POST /api/chat             → saves new message