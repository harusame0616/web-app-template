/*
  Warnings:

  - You are about to drop the `attendances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_userId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_userId_fkey";

-- DropTable
DROP TABLE "attendances";

-- DropTable
DROP TABLE "sales";

-- DropTable
DROP TABLE "settings";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "threads" (
    "thread_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author_name" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "password_hash" VARCHAR(255),
    "image_urls" TEXT[],
    "video_ids" TEXT[],
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("thread_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,
    "author_name" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "password_hash" VARCHAR(255),
    "image_urls" TEXT[],
    "video_ids" TEXT[],
    "deleted_at" TIMESTAMP(3),
    "comment_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE INDEX "threads_deleted_at_last_posted_at_idx" ON "threads"("deleted_at", "last_posted_at" DESC);

-- CreateIndex
CREATE INDEX "threads_created_at_idx" ON "threads"("created_at" DESC);

-- CreateIndex
CREATE INDEX "comments_thread_id_comment_number_idx" ON "comments"("thread_id", "comment_number");

-- CreateIndex
CREATE INDEX "comments_thread_id_deleted_at_created_at_idx" ON "comments"("thread_id", "deleted_at", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "comments_thread_id_comment_number_key" ON "comments"("thread_id", "comment_number");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "threads"("thread_id") ON DELETE CASCADE ON UPDATE CASCADE;
