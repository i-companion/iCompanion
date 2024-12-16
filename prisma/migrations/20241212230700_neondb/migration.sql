-- CreateTable
CREATE TABLE "AvailableTime" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "AvailableTime_pkey" PRIMARY KEY ("id")
);
