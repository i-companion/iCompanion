-- DropForeignKey
ALTER TABLE "Interests" DROP CONSTRAINT "Interests_profileId_fkey";

-- AlterTable
ALTER TABLE "Interests" ALTER COLUMN "profileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Interests" ADD CONSTRAINT "Interests_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
