/*
  Warnings:

  - You are about to drop the column `AnoPublication` on the `Libro` table. All the data in the column will be lost.

*/
-- AlterSequence
ALTER SEQUENCE "Libro_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Libro" DROP COLUMN "AnoPublication";
