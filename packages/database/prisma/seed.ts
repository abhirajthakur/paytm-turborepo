import bcrypt from "bcryptjs";
import prisma from "../src";

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice.dummy@gmail.com" },
    update: {},
    create: {
      email: "alice.dummy@gmail.com",
      password: await bcrypt.hash("12341234", 10),
      name: "Alice",
      emailVerified: new Date(),
      balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob.dummy@gmail.com" },
    update: {},
    create: {
      email: "bob.dummy@gmail.com",
      password: await bcrypt.hash("12341234", 10),
      name: "Bob",
      emailVerified: new Date(),
      balance: {
        create: {
          amount: 1500,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 1500,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });

  const john = await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      email: "john.doe@example.com",
      password: await bcrypt.hash("12341234", 10),
      name: "John Doe",
      emailVerified: new Date(),
      balance: {
        create: {
          amount: 5500,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Processing",
          amount: 2500,
          token: "token__3",
          provider: "HDFC Bank",
        },
      },
    },
  });

  console.log({ bob, alice, john });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
  });
