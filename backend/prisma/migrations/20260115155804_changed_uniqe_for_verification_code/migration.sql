/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `verification_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "verification_codes_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_code_key" ON "verification_codes"("code");
