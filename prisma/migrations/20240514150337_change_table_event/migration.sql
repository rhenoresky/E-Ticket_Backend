/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `event` table. All the data in the column will be lost.
  - Added the required column `finishTime` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "finishTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
