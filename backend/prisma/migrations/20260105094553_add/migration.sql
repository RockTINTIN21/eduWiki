/*
  Warnings:

  - A unique constraint covering the columns `[status_name]` on the table `tickets_statuses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tickets_statuses_status_name_key" ON "tickets_statuses"("status_name");
