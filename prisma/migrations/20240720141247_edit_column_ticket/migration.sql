/*
  Warnings:

  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `linkQr` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `paymentLink` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketLink` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPayment" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_pkey",
DROP COLUMN "linkQr",
ADD COLUMN     "paymentLink" TEXT NOT NULL,
ADD COLUMN     "status" "StatusPayment" NOT NULL,
ADD COLUMN     "ticketLink" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ticket_pkey" PRIMARY KEY ("id");
