/*
  Warnings:

  - You are about to drop the `PrismaCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrismaNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrismaOffice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrismaStaff` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Man', 'Woman', 'Other');

-- DropForeignKey
ALTER TABLE "public"."PrismaCustomer" DROP CONSTRAINT "PrismaCustomer_officeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrismaNote" DROP CONSTRAINT "PrismaNote_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrismaNote" DROP CONSTRAINT "PrismaNote_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrismaStaff" DROP CONSTRAINT "PrismaStaff_officeId_fkey";

-- DropTable
DROP TABLE "public"."PrismaCustomer";

-- DropTable
DROP TABLE "public"."PrismaNote";

-- DropTable
DROP TABLE "public"."PrismaOffice";

-- DropTable
DROP TABLE "public"."PrismaStaff";

-- DropEnum
DROP TYPE "public"."PrismaGender";

-- CreateTable
CREATE TABLE "public"."Office" (
    "officeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("officeId")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "staffId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "userId" UUID,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "customerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstNameKana" TEXT NOT NULL,
    "lastNameKana" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "emails" TEXT[],
    "phones" TEXT[],
    "addresses" TEXT[],
    "remarks" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "public"."Note" (
    "noteId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "notedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Office_name_key" ON "public"."Office"("name");

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."Office"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."Office"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
