-- CreateTable
CREATE TABLE "DirectTransfer" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "DirectTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DirectTransfer" ADD CONSTRAINT "DirectTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectTransfer" ADD CONSTRAINT "DirectTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
