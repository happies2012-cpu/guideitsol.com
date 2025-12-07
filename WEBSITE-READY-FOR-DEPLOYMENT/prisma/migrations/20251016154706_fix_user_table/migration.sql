/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AIEnrollments" (
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
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AIEnrollments_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "AITool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AIEnrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AITool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "url" TEXT,
    "tags" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "AITool_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AITool" ("authorId", "category", "createdAt", "description", "featured", "icon", "id", "name", "tags", "updatedAt", "url") SELECT "authorId", "category", "createdAt", "description", "featured", "icon", "id", "name", "tags", "updatedAt", "url" FROM "AITool";
DROP TABLE "AITool";
ALTER TABLE "new_AITool" RENAME TO "AITool";
CREATE INDEX "AITool_name_idx" ON "AITool"("name");
CREATE INDEX "AITool_category_idx" ON "AITool"("category");
CREATE INDEX "AITool_tags_idx" ON "AITool"("tags");
CREATE INDEX "AITool_featured_idx" ON "AITool"("featured");
CREATE TABLE "new_Courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "videoUrl" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "rating" REAL NOT NULL DEFAULT 0,
    "studentsCount" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Courses_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Courses" ("categoryId", "createdAt", "createdBy", "description", "duration", "id", "instructor", "isPublished", "level", "price", "rating", "studentsCount", "thumbnailUrl", "title", "updatedAt", "videoUrl") SELECT "categoryId", "createdAt", "createdBy", "description", "duration", "id", "instructor", "isPublished", "level", "price", "rating", "studentsCount", "thumbnailUrl", "title", "updatedAt", "videoUrl" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE INDEX "Courses_categoryId_idx" ON "Courses"("categoryId");
CREATE INDEX "Courses_isPublished_idx" ON "Courses"("isPublished");
CREATE INDEX "Courses_level_idx" ON "Courses"("level");
CREATE TABLE "new_Enrollments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Enrollments" ("completed", "courseId", "enrolledAt", "id", "progress", "userId") SELECT "completed", "courseId", "enrolledAt", "id", "progress", "userId" FROM "Enrollments";
DROP TABLE "Enrollments";
ALTER TABLE "new_Enrollments" RENAME TO "Enrollments";
CREATE INDEX "Enrollments_userId_idx" ON "Enrollments"("userId");
CREATE INDEX "Enrollments_courseId_idx" ON "Enrollments"("courseId");
CREATE UNIQUE INDEX "Enrollments_userId_courseId_key" ON "Enrollments"("userId", "courseId");
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDesc" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Page" ("authorId", "content", "createdAt", "id", "metaDesc", "metaTitle", "published", "slug", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "metaDesc", "metaTitle", "published", "slug", "title", "updatedAt" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "AIEnrollments_toolId_idx" ON "AIEnrollments"("toolId");

-- CreateIndex
CREATE INDEX "AIEnrollments_email_idx" ON "AIEnrollments"("email");

-- CreateIndex
CREATE INDEX "AIEnrollments_phone_idx" ON "AIEnrollments"("phone");

-- CreateIndex
CREATE INDEX "AIEnrollments_isVerified_idx" ON "AIEnrollments"("isVerified");

-- CreateIndex
CREATE INDEX "AIEnrollments_isPaid_idx" ON "AIEnrollments"("isPaid");

-- CreateIndex
CREATE INDEX "CourseLessons_courseId_idx" ON "CourseLessons"("courseId");
