/*
  Warnings:

  - A unique constraint covering the columns `[userId,trackId]` on the table `BoughtTracks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,trackId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followeeId,followerId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,trackId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoughtTracks_userId_trackId_key" ON "BoughtTracks"("userId", "trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_trackId_key" ON "Comment"("userId", "trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followeeId_followerId_key" ON "Follow"("followeeId", "followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_trackId_key" ON "Like"("userId", "trackId");
