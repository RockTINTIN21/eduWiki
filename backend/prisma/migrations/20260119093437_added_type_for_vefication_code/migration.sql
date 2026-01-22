/*
  Warnings:

  - Added the required column `type` to the `verification_codes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('REGISTRATION', 'PASSWORD_RESET', 'EMAIL_CHANGE');

-- AlterTable
ALTER TABLE "verification_codes" ADD COLUMN     "type" "Type" NOT NULL;
