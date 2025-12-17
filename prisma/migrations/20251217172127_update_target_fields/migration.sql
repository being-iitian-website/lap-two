-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "targetId" TEXT;

-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "dailyAnswer1" TEXT,
ADD COLUMN     "dailyAnswer2" TEXT,
ADD COLUMN     "dailyQuestion1" TEXT,
ADD COLUMN     "dailyQuestion2" TEXT,
ADD COLUMN     "responseDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE CASCADE ON UPDATE CASCADE;
