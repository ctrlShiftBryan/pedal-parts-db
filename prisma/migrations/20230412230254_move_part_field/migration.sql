/*
  Warnings:

  - You are about to drop the column `part` on the `Part` table. All the data in the column will be lost.
  - Added the required column `partNum` to the `PedalPart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Part" DROP COLUMN "part";

-- AlterTable
ALTER TABLE "PedalPart" ADD COLUMN     "partNum" TEXT NOT NULL;
