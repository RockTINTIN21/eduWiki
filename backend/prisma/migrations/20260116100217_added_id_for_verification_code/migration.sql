-- AlterTable
ALTER TABLE "verification_codes" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "verification_codes_pkey" PRIMARY KEY ("id");
