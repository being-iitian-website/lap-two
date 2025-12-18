-- CreateTable
CREATE TABLE "VisionBoard" (
    "id" TEXT NOT NULL,
    "columns" INTEGER NOT NULL,
    "rows" INTEGER NOT NULL,
    "gap" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisionBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisionBoardItem" (
    "id" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "rowSpan" INTEGER NOT NULL DEFAULT 1,
    "columnSpan" INTEGER NOT NULL DEFAULT 1,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "imageUrl" TEXT,
    "fontSize" INTEGER,
    "textColor" TEXT,
    "background" TEXT,
    "boardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisionBoardItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisionBoard" ADD CONSTRAINT "VisionBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisionBoardItem" ADD CONSTRAINT "VisionBoardItem_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "VisionBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
