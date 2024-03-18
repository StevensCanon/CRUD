/*
  Warnings:

  - You are about to drop the column `UpdatedAt` on the `Libro` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Libro" DROP COLUMN "UpdatedAt";
ALTER TABLE "Libro" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
