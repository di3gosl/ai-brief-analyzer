-- AlterTable
ALTER TABLE "EstimationPhase" ADD COLUMN     "cost" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "EstimationSummary" ADD COLUMN     "totalBudget" TEXT NOT NULL DEFAULT '';
