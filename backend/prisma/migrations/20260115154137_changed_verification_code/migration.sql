-- DropIndex
DROP INDEX "verification_codes_code_key";

-- AlterTable
ALTER TABLE "verification_codes" ALTER COLUMN "code" SET DATA TYPE TEXT;
