/*
  Warnings:

  - You are about to drop the column `section` on the `DailyXPAward` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `focusXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `journalXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `meditationXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `revisionXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `sleepXP` on the `UserXP` table. All the data in the column will be lost.
  - You are about to drop the column `targetXP` on the `UserXP` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyXPAward" DROP COLUMN "section";

-- AlterTable
ALTER TABLE "UserXP" DROP COLUMN "exerciseXP",
DROP COLUMN "focusXP",
DROP COLUMN "journalXP",
DROP COLUMN "meditationXP",
DROP COLUMN "revisionXP",
DROP COLUMN "sleepXP",
DROP COLUMN "targetXP";

-- DropEnum
DROP TYPE "XPSection";
