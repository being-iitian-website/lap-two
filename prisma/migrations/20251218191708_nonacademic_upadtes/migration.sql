-- CreateTable
CREATE TABLE "DailyWellness" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sleptAt" TIMESTAMP(3),
    "actualSleepTime" TIMESTAMP(3),
    "actualWakeTime" TIMESTAMP(3),
    "exerciseDone" BOOLEAN NOT NULL DEFAULT false,
    "meditationDone" BOOLEAN NOT NULL DEFAULT false,
    "waterIntakeMl" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyWellness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyWellness_userId_date_key" ON "DailyWellness"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyWellness" ADD CONSTRAINT "DailyWellness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
