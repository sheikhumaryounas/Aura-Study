"use server"

import { db } from "@/lib/db"
import bcrypt from "bcrypt"

export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User already exists with this email" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}
