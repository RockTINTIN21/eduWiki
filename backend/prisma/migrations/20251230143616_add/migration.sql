/*
  Warnings:

  - Changed the type of `entity_action` on the `tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "entity_action",
ADD COLUMN     "entity_action" "EntityActionEnum" NOT NULL;
