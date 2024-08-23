/*
  Warnings:

  - You are about to drop the column `progress` on the `UserQuest` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserQuest` table. All the data in the column will be lost.
  - You are about to drop the `QuestItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `progression` to the `UserQuest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserQuest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestItem" DROP CONSTRAINT "QuestItem_questId_fkey";

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gold" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserQuest" DROP COLUMN "progress",
DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "progression" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "QuestItem";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "filledIn" BOOLEAN NOT NULL DEFAULT false,
    "userQuestId" TEXT,

    CONSTRAINT "UserQuestItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcTransaction" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "giver" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NpcTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestItem" ADD CONSTRAINT "UserQuestItem_userQuestId_fkey" FOREIGN KEY ("userQuestId") REFERENCES "UserQuest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
