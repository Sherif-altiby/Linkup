"use server";

import { SignupFormSchema, FormState, LoginFormSchema } from "../../lib/definitions";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function signup(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse(rawData);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, password } = validatedFields.data;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user data in the database (replace with your actual database logic)
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || "",
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set the token in a cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds);
    });

    return { success: true, message: "User created successfully" };
  } catch (error: any) {
    // Handle unique constraint violation (e.g., email already exists)
    if (error.code === "P2002") {
      const target = error.meta?.target?.[0] || "Field";
      return { success: false, message: `${target} already exists` };
    }

    console.error("Signup error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function login(formData: FormData) {
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;


  const validatedFields = LoginFormSchema.safeParse({ email, password });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }


  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { success: false, message: "Invalid email or password" };
    }


    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user.id },
       process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    // Set the token in a cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
