/*
  Warnings:

  - Added the required column `hour` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "hour" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;
