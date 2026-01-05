/*
  Warnings:

  - Made the column `entity_id` on table `tickets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entity_action` on table `tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "entity_id" SET NOT NULL,
ALTER COLUMN "entity_action" SET NOT NULL;
