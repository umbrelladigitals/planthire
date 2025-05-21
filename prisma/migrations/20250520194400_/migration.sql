-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "dailyRate" DECIMAL(10,2),
ADD COLUMN     "monthlyRate" DECIMAL(10,2),
ADD COLUMN     "weeklyRate" DECIMAL(10,2);
