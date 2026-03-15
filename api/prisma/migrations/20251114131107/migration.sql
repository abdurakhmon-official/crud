/*
  Warnings:

  - A unique constraint covering the columns `[active]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_active_key" ON "User"("active");
