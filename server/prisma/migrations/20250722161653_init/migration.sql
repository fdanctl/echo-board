/*
  Warnings:

  - You are about to drop the column `trackType` on the `Track` table. All the data in the column will be lost.
  - Added the required column `trackTypeId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "trackType",
ADD COLUMN     "trackTypeId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "TrackType";

-- CreateTable
CREATE TABLE "TrackType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrackType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackType_name_key" ON "TrackType"("name");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_trackTypeId_fkey" FOREIGN KEY ("trackTypeId") REFERENCES "TrackType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
