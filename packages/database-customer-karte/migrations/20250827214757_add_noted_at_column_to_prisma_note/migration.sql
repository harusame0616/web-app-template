/*
  Warnings:

  - Added the required column `notedAt` to the `PrismaNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrismaNote" ADD COLUMN     "notedAt" TIMESTAMP(3) NOT NULL;
