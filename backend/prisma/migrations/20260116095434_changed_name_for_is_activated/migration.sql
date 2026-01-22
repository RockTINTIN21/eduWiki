/*
  Warnings:

  - You are about to drop the column `isActivated` on the `verification_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "verification_codes" DROP COLUMN "isActivated",
ADD COLUMN     "is_activated" BOOLEAN NOT NULL DEFAULT false;
