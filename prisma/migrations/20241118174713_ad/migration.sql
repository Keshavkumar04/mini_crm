/*
  Warnings:

  - You are about to drop the `Condition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Condition" DROP CONSTRAINT "Condition_audienceSegmentId_fkey";

-- DropForeignKey
ALTER TABLE "Condition" DROP CONSTRAINT "Condition_fieldId_fkey";

-- AlterTable
ALTER TABLE "AudienceSegment" ADD COLUMN     "maxVisitCount" INTEGER,
ADD COLUMN     "minTotalSpending" INTEGER;

-- DropTable
DROP TABLE "Condition";

-- DropTable
DROP TABLE "Field";
