-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");
