-- CreateEnum
CREATE TYPE "XPSection" AS ENUM ('focus', 'exercise', 'meditation', 'sleep', 'revision', 'journal', 'target');

-- AlterTable
ALTER TABLE "DailyXPAward" ADD COLUMN     "section" "XPSection";

-- AlterTable
ALTER TABLE "UserXP" ADD COLUMN     "exerciseXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "focusXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "journalXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "meditationXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "revisionXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sleepXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "targetXP" INTEGER NOT NULL DEFAULT 0;
