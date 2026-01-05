/*
  Warnings:

  - Changed the type of `entity_type` on the `tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `entity_action` on the `tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntityTypeEnum" AS ENUM ('COUNTRY', 'UNIVERSITY', 'PROGRAM');

-- CreateEnum
CREATE TYPE "EntityActionEnum" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "entity_type",
ADD COLUMN     "entity_type" "EntityTypeEnum" NOT NULL,
DROP COLUMN "entity_action",
ADD COLUMN     "entity_action" "EntityTypeEnum" NOT NULL;
