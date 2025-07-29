-- DropForeignKey
ALTER TABLE "TrackPlay" DROP CONSTRAINT "TrackPlay_userId_fkey";

-- AlterTable
ALTER TABLE "TrackPlay" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TrackPlay" ADD CONSTRAINT "TrackPlay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
