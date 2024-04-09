"use server";

import { auth } from "@/auth";
import prisma from "@repo/database";

export const getOnrampTransactions = async () => {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  if (!userId) {
    return { error: "User not logged in" };
  }

  try {
    const tsxs = await prisma.onRampTransaction.findMany({
      where: { userId },
    });

    return {
      transactions: tsxs
        .map((tsx) => ({
          time: tsx.startTime,
          amount: tsx.amount,
          status: tsx.status,
          provider: tsx.provider,
        }))
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .slice(0, 5),
    };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
};

export const createOnRampTransaction = async (
  amount: number,
  provider: string,
) => {
  const session = await auth();
  const userId = session?.user?.id ?? "";
  const randomNumber = Math.random().toString();
  const token = "token__".concat(randomNumber.substring(2));

  if (!userId) {
    return { error: "User not logged in" };
  }

  try {
    await prisma.onRampTransaction.create({
      data: {
        userId,
        amount,
        status: "Processing",
        startTime: new Date(),
        provider,
        token,
      },
    });

    return { success: "On Ramp transactin added" };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
};
