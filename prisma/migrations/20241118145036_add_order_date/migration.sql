/*
  Warnings:

  - You are about to drop the column `conditions` on the `AudienceSegment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AudienceSegment" DROP COLUMN "conditions";

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "audienceSegmentId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "operator" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "logic" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_audienceSegmentId_fkey" FOREIGN KEY ("audienceSegmentId") REFERENCES "AudienceSegment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
