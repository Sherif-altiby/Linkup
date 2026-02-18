"use server"

import { SignupFormSchema, FormState } from "../../lib/definitions"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";


export async function signup(formData: FormData) {

   const rawData = {
        firstName : formData.get('first-name') as string,
        lastName : formData.get('last-name') as string,
        email : formData.get('email') as string,
        phone : formData.get('phone') as string,
        password : formData.get('password') as string,
        confirmPassword : formData.get('confirm-password') as string,
   }
 
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse(rawData) 


  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, phone, password } = validatedFields.data

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

  // Store user data in the database (replace with your actual database logic)
  try {
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone: phone || "",
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '7d' })

  
  // Set the token in a cookie
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds);
})

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