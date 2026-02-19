/*
  Warnings:

  - You are about to drop the column `target_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_target_id_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "target_id",
ADD COLUMN     "country_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
