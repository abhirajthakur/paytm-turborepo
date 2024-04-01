"use server";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@repo/common/schema";
import { generateVerificationToken } from "@repo/common/token";
import prisma from "@repo/database";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  // if there is no existing user or user is not registered with credentials instead user is registered with OAuth
  if (!existingUser || !existingUser.email) {
    return { error: "User not registered!" };
  }

  if (!existingUser.password) {
    return { error: "User registered with different provider!" };
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password || "",
  );

  if (!isCorrectPassword) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
