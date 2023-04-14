/*
  Warnings:

  - A unique constraint covering the columns `[type,value]` on the table `Part` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Part_type_value_key" ON "Part"("type", "value");
