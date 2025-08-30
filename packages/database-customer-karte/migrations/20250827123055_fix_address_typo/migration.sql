/*
  Warnings:

  - You are about to drop the column `address` on the `PrismaCustomer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrismaCustomer" DROP COLUMN "address",
ADD COLUMN     "addresses" TEXT[];
