-- CreateEnum
CREATE TYPE "UserStatusEnum" AS ENUM ('ACTIVE', 'BLOCK', 'DELETE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserStatusEnum" NOT NULL DEFAULT 'ACTIVE';
