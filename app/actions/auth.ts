"use server";

import { SignupFormSchema, LoginFormSchema } from "@/lib/definitions";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function signup(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || "",
        password: hashedPassword,
      },
    });

    return { success: true, message: "User created successfully" };
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta?.target?.[0] || "Field";
      return { success: false, message: `${target} already exists` };
    }
    console.error("Signup error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function validateLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginFormSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { success: true };
}