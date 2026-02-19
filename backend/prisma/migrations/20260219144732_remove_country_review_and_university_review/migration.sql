/*
  Warnings:

  - You are about to drop the `country_review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `universities_review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `target_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "country_review" DROP CONSTRAINT "country_review_country_id_fkey";

-- DropForeignKey
ALTER TABLE "country_review" DROP CONSTRAINT "country_review_review_id_fkey";

-- DropForeignKey
ALTER TABLE "universities_review" DROP CONSTRAINT "universities_review_review_id_fkey";

-- DropForeignKey
ALTER TABLE "universities_review" DROP CONSTRAINT "universities_review_university_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "target_id" UUID NOT NULL,
ADD COLUMN     "university_id" UUID;

-- DropTable
DROP TABLE "country_review";

-- DropTable
DROP TABLE "universities_review";

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
