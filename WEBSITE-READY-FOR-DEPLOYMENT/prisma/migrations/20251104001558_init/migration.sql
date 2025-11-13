/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Security` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_user_referrals_relation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_user_referrals_relation_A_fkey" FOREIGN KEY ("A") REFERENCES "AffiliateReferral" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_referrals_relation_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_referrals_relation_AB_unique" ON "_user_referrals_relation"("A", "B");

-- CreateIndex
CREATE INDEX "_user_referrals_relation_B_index" ON "_user_referrals_relation"("B");

-- CreateIndex
CREATE INDEX "Lesson_courseId_idx" ON "Lesson"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Security_userId_key" ON "Security"("userId");

-- CreateIndex
CREATE INDEX "UserBookmark_userId_idx" ON "UserBookmark"("userId");

-- CreateIndex
CREATE INDEX "UserNote_userId_idx" ON "UserNote"("userId");

-- CreateIndex
CREATE INDEX "UserProgress_userId_idx" ON "UserProgress"("userId");

-- CreateIndex
CREATE INDEX "UserProgress_lessonId_idx" ON "UserProgress"("lessonId");

-- CreateIndex
CREATE INDEX "UserProgress_courseId_idx" ON "UserProgress"("courseId");
