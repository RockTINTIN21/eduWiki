/*
  Warnings:

  - You are about to drop the column `recommended` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `type` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `verification_codes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VerificationCodeEnum" AS ENUM ('REGISTRATION', 'PASSWORD_RESET', 'EMAIL_CHANGE');

-- CreateEnum
CREATE TYPE "ReviewEnum" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "recommended",
ADD COLUMN     "type" "ReviewEnum" NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "verification_codes" DROP COLUMN "type",
ADD COLUMN     "type" "VerificationCodeEnum" NOT NULL;

-- DropEnum
DROP TYPE "Type";
