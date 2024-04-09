"use server";

import { auth } from "@/auth";
import prisma from "@repo/database";

export const getBalance = async () => {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  if (!userId) {
    return { error: "User not logged in" };
  }

  try {
    const balance = await prisma.balance.findFirst({
      where: { userId: session?.user?.id },
    });

    return {
      amount: balance?.amount,
      locked: balance?.locked,
    };
  } catch (e) {
    return {
      amount: NaN,
      locked: NaN,
    };
  }
};
