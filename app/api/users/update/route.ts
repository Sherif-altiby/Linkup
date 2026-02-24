import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, password, location, birthdate, image } = body;

    // Build update data object — only include fields that were provided
    const updateData: Record<string, any> = {};

    if (name !== undefined)      updateData.name      = name;
    if (email !== undefined)     updateData.email     = email;
    if (phone !== undefined)     updateData.phone     = phone;
    if (location !== undefined)  updateData.location  = location;
    if (image !== undefined)     updateData.image     = image;

    if (birthdate !== undefined) {
        updateData.birthDate = birthdate || null;
    }

    // Hash password only if a new one was provided
    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        birthDate: true,
        image: true,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[PATCH /api/user]", error);

    // Handle unique constraint on email
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}