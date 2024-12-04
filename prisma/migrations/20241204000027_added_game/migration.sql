-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "interestId" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
