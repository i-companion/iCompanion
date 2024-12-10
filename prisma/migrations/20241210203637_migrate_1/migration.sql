/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - The `interests` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[owner]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "interests",
ADD COLUMN     "interests" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_owner_key" ON "Profile"("owner");

-- CreateIndex
CREATE INDEX "Profile_owner_idx" ON "Profile"("owner");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
