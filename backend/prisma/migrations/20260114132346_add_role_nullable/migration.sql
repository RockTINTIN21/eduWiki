/*
  Warnings:

  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RolesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_B_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roleId" INTEGER;

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "_RolesToUser";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
