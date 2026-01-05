/*
  Warnings:

  - You are about to alter the column `name` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(55)`.
  - You are about to alter the column `symbol` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(1)`.
  - Added the required column `code` to the `currency` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `currency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `symbol` on table `currency` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "currency" ADD COLUMN     "code" VARCHAR(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "symbol" SET NOT NULL,
ALTER COLUMN "symbol" SET DATA TYPE VARCHAR(1);
