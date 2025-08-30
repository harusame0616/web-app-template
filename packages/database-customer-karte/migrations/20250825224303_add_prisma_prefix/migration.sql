/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Office` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PrismaGender" AS ENUM ('Man', 'Woman', 'Other');

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_officeId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_customerId_fkey";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Office";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "PrismaOffice" (
    "officeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrismaOffice_pkey" PRIMARY KEY ("officeId")
);

-- CreateTable
CREATE TABLE "PrismaCustomer" (
    "customerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstNameKana" TEXT NOT NULL,
    "lastNameKana" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "PrismaGender" NOT NULL,
    "emails" TEXT[],
    "phones" TEXT[],
    "address" TEXT[],
    "remarks" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrismaCustomer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "PrismaNote" (
    "noteId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrismaNote_pkey" PRIMARY KEY ("noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrismaOffice_name_key" ON "PrismaOffice"("name");

-- AddForeignKey
ALTER TABLE "PrismaCustomer" ADD CONSTRAINT "PrismaCustomer_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "PrismaOffice"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrismaNote" ADD CONSTRAINT "PrismaNote_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "PrismaCustomer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
