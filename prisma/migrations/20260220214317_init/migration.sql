-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "model" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSummary" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ProjectSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunctionalRequirement" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "FunctionalRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MvpItem" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "MvpItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NiceToHaveItem" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "NiceToHaveItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStackCategory" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "TechStackCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechStackItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "TechStackItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "level" "RiskLevel" NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assumption" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Assumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingQuestion" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "MissingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimationSummary" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "totalDuration" TEXT NOT NULL,
    "totalEffort" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,

    CONSTRAINT "EstimationSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimationPhase" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "effort" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "EstimationPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimationCaveat" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "EstimationCaveat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analysis_createdAt_idx" ON "Analysis"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Analysis_provider_model_idx" ON "Analysis"("provider", "model");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSummary_analysisId_key" ON "ProjectSummary"("analysisId");

-- CreateIndex
CREATE INDEX "FunctionalRequirement_analysisId_sortOrder_idx" ON "FunctionalRequirement"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "MvpItem_analysisId_sortOrder_idx" ON "MvpItem"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "NiceToHaveItem_analysisId_sortOrder_idx" ON "NiceToHaveItem"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "TechStackCategory_analysisId_sortOrder_idx" ON "TechStackCategory"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "TechStackItem_categoryId_sortOrder_idx" ON "TechStackItem"("categoryId", "sortOrder");

-- CreateIndex
CREATE INDEX "Risk_analysisId_sortOrder_idx" ON "Risk"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "Assumption_analysisId_sortOrder_idx" ON "Assumption"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "MissingQuestion_analysisId_sortOrder_idx" ON "MissingQuestion"("analysisId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "EstimationSummary_analysisId_key" ON "EstimationSummary"("analysisId");

-- CreateIndex
CREATE INDEX "EstimationPhase_analysisId_sortOrder_idx" ON "EstimationPhase"("analysisId", "sortOrder");

-- CreateIndex
CREATE INDEX "EstimationCaveat_analysisId_sortOrder_idx" ON "EstimationCaveat"("analysisId", "sortOrder");

-- AddForeignKey
ALTER TABLE "ProjectSummary" ADD CONSTRAINT "ProjectSummary_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionalRequirement" ADD CONSTRAINT "FunctionalRequirement_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MvpItem" ADD CONSTRAINT "MvpItem_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NiceToHaveItem" ADD CONSTRAINT "NiceToHaveItem_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStackCategory" ADD CONSTRAINT "TechStackCategory_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechStackItem" ADD CONSTRAINT "TechStackItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TechStackCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assumption" ADD CONSTRAINT "Assumption_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissingQuestion" ADD CONSTRAINT "MissingQuestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimationSummary" ADD CONSTRAINT "EstimationSummary_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimationPhase" ADD CONSTRAINT "EstimationPhase_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimationCaveat" ADD CONSTRAINT "EstimationCaveat_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
