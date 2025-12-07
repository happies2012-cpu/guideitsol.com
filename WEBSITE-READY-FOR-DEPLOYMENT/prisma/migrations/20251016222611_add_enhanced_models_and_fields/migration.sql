-- AlterTable
ALTER TABLE "users" ADD COLUMN "avatar" TEXT;
ALTER TABLE "users" ADD COLUMN "bio" TEXT;
ALTER TABLE "users" ADD COLUMN "linkedin" TEXT;
ALTER TABLE "users" ADD COLUMN "location" TEXT;
ALTER TABLE "users" ADD COLUMN "twitter" TEXT;
ALTER TABLE "users" ADD COLUMN "website" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "toolId" TEXT,
    "courseId" TEXT,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "AITool" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearningPath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LearningPathStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentUrl" TEXT,
    "duration" INTEGER NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearningPathStep_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "LearningPath" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearningPathEnrollment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "LearningPathEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningPathEnrollment_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "LearningPath" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AIEnrollments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedin" TEXT,
    "aadhar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "message" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "transactionId" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "lastAccessed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "certificateUrl" TEXT,
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AIEnrollments_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "AITool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AIEnrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AIEnrollments" ("aadhar", "email", "enrolledAt", "id", "isPaid", "isVerified", "linkedin", "message", "name", "pan", "phone", "toolId", "transactionId", "userId") SELECT "aadhar", "email", "enrolledAt", "id", "isPaid", "isVerified", "linkedin", "message", "name", "pan", "phone", "toolId", "transactionId", "userId" FROM "AIEnrollments";
DROP TABLE "AIEnrollments";
ALTER TABLE "new_AIEnrollments" RENAME TO "AIEnrollments";
CREATE INDEX "AIEnrollments_toolId_idx" ON "AIEnrollments"("toolId");
CREATE INDEX "AIEnrollments_email_idx" ON "AIEnrollments"("email");
CREATE INDEX "AIEnrollments_phone_idx" ON "AIEnrollments"("phone");
CREATE INDEX "AIEnrollments_isVerified_idx" ON "AIEnrollments"("isVerified");
CREATE INDEX "AIEnrollments_isPaid_idx" ON "AIEnrollments"("isPaid");
CREATE INDEX "AIEnrollments_lastAccessed_idx" ON "AIEnrollments"("lastAccessed");
CREATE TABLE "new_AITool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "url" TEXT,
    "tags" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pricingModel" TEXT,
    "monthlyPrice" REAL,
    "annualPrice" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "AITool_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AITool" ("authorId", "category", "createdAt", "description", "featured", "icon", "id", "name", "tags", "updatedAt", "url", "lastUpdated") SELECT "authorId", "category", "createdAt", "description", "featured", "icon", "id", "name", "tags", "updatedAt", "url", "createdAt" AS "lastUpdated" FROM "AITool";
DROP TABLE "AITool";
ALTER TABLE "new_AITool" RENAME TO "AITool";
CREATE INDEX "AITool_name_idx" ON "AITool"("name");
CREATE INDEX "AITool_category_idx" ON "AITool"("category");
CREATE INDEX "AITool_tags_idx" ON "AITool"("tags");
CREATE INDEX "AITool_featured_idx" ON "AITool"("featured");
CREATE INDEX "AITool_rating_idx" ON "AITool"("rating");
CREATE INDEX "AITool_usageCount_idx" ON "AITool"("usageCount");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_toolId_idx" ON "Review"("toolId");

-- CreateIndex
CREATE INDEX "Review_courseId_idx" ON "Review"("courseId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "LearningPath_category_idx" ON "LearningPath"("category");

-- CreateIndex
CREATE INDEX "LearningPath_difficulty_idx" ON "LearningPath"("difficulty");

-- CreateIndex
CREATE INDEX "LearningPath_isPublished_idx" ON "LearningPath"("isPublished");

-- CreateIndex
CREATE INDEX "LearningPathStep_pathId_idx" ON "LearningPathStep"("pathId");

-- CreateIndex
CREATE INDEX "LearningPathStep_order_idx" ON "LearningPathStep"("order");

-- CreateIndex
CREATE INDEX "LearningPathEnrollment_userId_idx" ON "LearningPathEnrollment"("userId");

-- CreateIndex
CREATE INDEX "LearningPathEnrollment_pathId_idx" ON "LearningPathEnrollment"("pathId");

-- CreateIndex
CREATE INDEX "LearningPathEnrollment_completed_idx" ON "LearningPathEnrollment"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPathEnrollment_userId_pathId_key" ON "LearningPathEnrollment"("userId", "pathId");