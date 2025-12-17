-- CreateEnum
CREATE TYPE "RevisionStatus" AS ENUM ('pending', 'completed', 'missed');

-- CreateEnum
CREATE TYPE "RevisionSource" AS ENUM ('manual', 'target');

-- AlterTable
ALTER TABLE "Target" ALTER COLUMN "plannedHours" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "units" TEXT[],
    "notes" TEXT,
    "revisionDate" TIMESTAMP(3) NOT NULL,
    "status" "RevisionStatus" NOT NULL DEFAULT 'pending',
    "source" "RevisionSource" NOT NULL,
    "targetId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
