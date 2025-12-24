/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User_info` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User_info" ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local';

-- CreateIndex
CREATE UNIQUE INDEX "User_info_googleId_key" ON "User_info"("googleId");
