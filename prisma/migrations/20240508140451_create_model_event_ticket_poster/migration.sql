-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" INTEGER NOT NULL,
    "linkQr" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poster" (
    "id" SERIAL NOT NULL,
    "linkImage" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "poster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poster" ADD CONSTRAINT "poster_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
