/*
  Warnings:

  - Added the required column `staffId` to the `PrismaNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PrismaNote" ADD COLUMN     "staffId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."PrismaStaff" (
    "staffId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "userId" UUID,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrismaStaff_pkey" PRIMARY KEY ("staffId")
);

-- AddForeignKey
ALTER TABLE "public"."PrismaStaff" ADD CONSTRAINT "PrismaStaff_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."PrismaOffice"("officeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrismaNote" ADD CONSTRAINT "PrismaNote_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."PrismaStaff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
