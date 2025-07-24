-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "keyId" INTEGER;

-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_name_key" ON "Key"("name");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("id") ON DELETE SET NULL ON UPDATE CASCADE;
