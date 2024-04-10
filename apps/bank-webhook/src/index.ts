import prisma from "@repo/database";
import express from "express";

const app = express();

app.use(express.json());

// TODO: Add zod validation
// TODO: Bank should send a secret so we know this is sent by that particular bank
// TODO: Check if this onRampTransaction is in processing state or not

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      }),

      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
    ]);

    res.json({ message: "captured" });
  } catch (e) {
    console.log(e);
    res.status(411).json({ message: "Error while processing the transaction" });
  }
});

app.post("/sbiWebhook", async (req, res) => {
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      }),

      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
    ]);

    res.json({ message: "captured" });
  } catch (e) {
    console.log(e);
    res.status(411).json({ message: "Error while processing the transaction" });
  }
});

app.post("/iciciWebhook", async (req, res) => {
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      }),

      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
    ]);

    res.json({ message: "captured" });
  } catch (e) {
    console.log(e);
    res.status(411).json({ message: "Error while processing the transaction" });
  }
});

app.post("/axisWebhook", async (req, res) => {
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      }),

      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
    ]);

    res.json({ message: "captured" });
  } catch (e) {
    console.log(e);
    res.status(411).json({ message: "Error while processing the transaction" });
  }
});

app.listen(3002, () => {
  console.log("Server is listening on http://localhost:3002");
});
