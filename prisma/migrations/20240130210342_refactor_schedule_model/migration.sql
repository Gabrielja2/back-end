/*
  Warnings:

  - You are about to drop the column `end_` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `end` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "end_",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL;
