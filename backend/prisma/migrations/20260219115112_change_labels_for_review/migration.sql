/*
  Warnings:

  - You are about to drop the column `content` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `is_recommended` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `unrecommended` on the `reviews` table. All the data in the column will be lost.
  - The `recommended` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "content",
DROP COLUMN "is_recommended",
DROP COLUMN "unrecommended",
ADD COLUMN     "dislikes" INTEGER,
ADD COLUMN     "likes" INTEGER,
ADD COLUMN     "text" TEXT,
DROP COLUMN "recommended",
ADD COLUMN     "recommended" BOOLEAN;
