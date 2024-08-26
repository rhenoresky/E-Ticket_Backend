-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "StatusPayment" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "StatusTicket" AS ENUM ('USED', 'UNUSED');

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "finishTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "ticketLink" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "status" "StatusTicket" NOT NULL DEFAULT 'UNUSED',

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poster" (
    "id" SERIAL NOT NULL,
    "linkImage" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "paymentLink" TEXT NOT NULL,
    "status" "StatusPayment" NOT NULL DEFAULT 'PENDING',
    "accountId" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poster" ADD CONSTRAINT "poster_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
