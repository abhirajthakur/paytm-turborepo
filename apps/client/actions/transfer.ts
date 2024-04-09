"use server";

import { auth } from "@/auth";
import prisma from "@repo/database";

export const getDirectTransfers = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "error while sending money!" };
  }

  const toUserTransfers = await prisma.directTransfer.findMany({
    where: { fromUserId: userId },
    include: {
      toUser: {
        select: {
          name: true,
        },
      },
    },
  });

  const toTransfers = toUserTransfers.map((transfer) => ({
    id: transfer.id,
    amount: transfer.amount,
    startTime: transfer.startTime,
    fromUserId: transfer.fromUserId,
    toUserId: transfer.toUserId,
    name: transfer.toUser.name,
  }));

  const fromUserTransfers = await prisma.directTransfer.findMany({
    where: { toUserId: userId },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },
    },
  });

  const fromTransfers = fromUserTransfers.map((transfer) => ({
    id: transfer.id,
    amount: transfer.amount,
    startTime: transfer.startTime,
    fromUserId: transfer.fromUserId,
    toUserId: transfer.toUserId,
    name: transfer.fromUser.name ?? "",
  }));

  try {
    const allTransfers = toTransfers.concat(fromTransfers);

    return {
      transfers: allTransfers
        .map((transfer) => ({
          name: transfer.name ?? "",
          status: transfer.toUserId == userId ? "Received" : "Sent",
          time: transfer.startTime,
          amount: transfer.amount,
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

export const directTransfer = async (to: string, amount: number) => {
  const session = await auth();
  const from = session?.user?.id;

  if (!from) {
    return { error: "error while sending money!" };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      email: to,
    },
  });

  if (!toUser) {
    return { error: "User not found!" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Locking row for the table
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: from },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Funds!");
      }

      await tx.balance.update({
        where: { userId: from },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.directTransfer.create({
        data: {
          fromUserId: from,
          toUserId: toUser.id,
          amount,
          startTime: new Date(),
        },
      });
    });

    return { success: "Transfer Successful!" };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
  }
};
