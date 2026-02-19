/*
  Warnings:

  - A unique constraint covering the columns `[ru_name]` on the table `country` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "country" ALTER COLUMN "ru_name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "country_ru_name_key" ON "country"("ru_name");
