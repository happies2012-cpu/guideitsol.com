#!/usr/bin/env node

// Script to migrate data from SQLite to Supabase

import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://supabase.guideitsol.com'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2Mjg1ODAyMCwiZXhwIjo0OTE4NTMxNjIwLCJyb2xlIjoiYW5vbiJ9._a2-f349rsEhjI3885KwU72jrIPD0spnygpCOxRQsKk'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const prisma = new PrismaClient()

// Check if Supabase is available
async function isSupabaseAvailable() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count()', { count: 'exact' })
      .limit(1)
    
    return !error
  } catch (error) {
    console.warn('Supabase is not available:', error.message)
    return false
  }
}

async function migrateUsers() {
  console.log('Migrating users...')
  try {
    const users = await prisma.user.findMany()
    if (users.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping user migration')
        return
      }
      
      const { data, error } = await supabase
        .from('users')
        .insert(users.map(user => ({
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
          location: user.location,
          website: user.website,
          linkedin: user.linkedin,
          twitter: user.twitter,
          created_at: user.createdAt,
          updated_at: user.updatedAt
        })))
      
      if (error) {
        console.error('Error migrating users:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} users`)
      }
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

async function migrateAITools() {
  console.log('Migrating AI tools...')
  try {
    const aiTools = await prisma.aITool.findMany()
    if (aiTools.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping AI tools migration')
        return
      }
      
      const { data, error } = await supabase
        .from('ai_tools')
        .insert(aiTools.map(tool => ({
          id: tool.id,
          name: tool.name,
          description: tool.description,
          category: tool.category,
          icon: tool.icon,
          url: tool.url,
          tags: tool.tags,
          featured: tool.featured,
          usage_count: tool.usageCount,
          rating: tool.rating,
          review_count: tool.reviewCount,
          last_updated: tool.lastUpdated,
          pricing_model: tool.pricingModel,
          monthly_price: tool.monthlyPrice,
          annual_price: tool.annualPrice,
          created_at: tool.createdAt,
          updated_at: tool.updatedAt,
          author_id: tool.authorId
        })))
      
      if (error) {
        console.error('Error migrating AI tools:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} AI tools`)
      }
    }
  } catch (error) {
    console.error('Error fetching AI tools:', error)
  }
}

async function migrateCourses() {
  console.log('Migrating courses...')
  try {
    const courses = await prisma.courses.findMany({
      include: {
        category: true
      }
    })
    if (courses.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping courses migration')
        return
      }
      
      const { data, error } = await supabase
        .from('courses')
        .insert(courses.map(course => ({
          id: course.id,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          duration: course.duration,
          level: course.level,
          category_id: course.categoryId,
          thumbnail_url: course.thumbnailUrl,
          video_url: course.videoUrl,
          price: course.price,
          rating: course.rating,
          students_count: course.studentsCount,
          is_published: course.isPublished,
          created_by: course.createdBy,
          created_at: course.createdAt,
          updated_at: course.updatedAt
        })))
      
      if (error) {
        console.error('Error migrating courses:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} courses`)
      }
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
  }
}

async function migrateEnrollments() {
  console.log('Migrating enrollments...')
  try {
    const enrollments = await prisma.enrollments.findMany()
    if (enrollments.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping enrollments migration')
        return
      }
      
      const { data, error } = await supabase
        .from('enrollments')
        .insert(enrollments.map(enrollment => ({
          id: enrollment.id,
          user_id: enrollment.userId,
          course_id: enrollment.courseId,
          progress: enrollment.progress,
          completed: enrollment.completed,
          enrolled_at: enrollment.enrolledAt
        })))
      
      if (error) {
        console.error('Error migrating enrollments:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} enrollments`)
      }
    }
  } catch (error) {
    console.error('Error fetching enrollments:', error)
  }
}

async function migrateAIEnrollments() {
  console.log('Migrating AI enrollments...')
  try {
    const aiEnrollments = await prisma.aIEnrollments.findMany()
    if (aiEnrollments.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping AI enrollments migration')
        return
      }
      
      const { data, error } = await supabase
        .from('ai_enrollments')
        .insert(aiEnrollments.map(enrollment => ({
          id: enrollment.id,
          user_id: enrollment.userId,
          tool_id: enrollment.toolId,
          name: enrollment.name,
          email: enrollment.email,
          phone: enrollment.phone,
          linkedin: enrollment.linkedin,
          aadhar: enrollment.aadhar,
          pan: enrollment.pan,
          message: enrollment.message,
          is_verified: enrollment.isVerified,
          is_paid: enrollment.isPaid,
          transaction_id: enrollment.transactionId,
          progress: enrollment.progress,
          last_accessed: enrollment.lastAccessed,
          certificate_issued: enrollment.certificateIssued,
          certificate_url: enrollment.certificateUrl,
          enrolled_at: enrollment.enrolledAt
        })))
      
      if (error) {
        console.error('Error migrating AI enrollments:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} AI enrollments`)
      }
    }
  } catch (error) {
    console.error('Error fetching AI enrollments:', error)
  }
}

async function migrateReviews() {
  console.log('Migrating reviews...')
  try {
    const reviews = await prisma.review.findMany()
    if (reviews.length > 0) {
      // Check if Supabase is available
      if (!await isSupabaseAvailable()) {
        console.warn('Supabase not available, skipping reviews migration')
        return
      }
      
      const { data, error } = await supabase
        .from('reviews')
        .insert(reviews.map(review => ({
          id: review.id,
          user_id: review.userId,
          tool_id: review.toolId,
          course_id: review.courseId,
          rating: review.rating,
          title: review.title,
          content: review.content,
          helpful_count: review.helpfulCount,
          created_at: review.createdAt,
          updated_at: review.updatedAt
        })))
      
      if (error) {
        console.error('Error migrating reviews:', error)
      } else {
        console.log(`Migrated ${data?.length || 0} reviews`)
      }
    }
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

async function migrateAll() {
  console.log('Starting database migration from SQLite to Supabase...')
  
  // Check if Supabase is available
  if (!await isSupabaseAvailable()) {
    console.error('Supabase is not available. Please check your connection and credentials.')
    console.log('\n⚠️  Please check:\n1. Have you created a Supabase project at https://app.supabase.com/?\n2. Have you updated the SUPABASE_URL and SUPABASE_ANON_KEY in your .env file?\n3. Have you run the schema.sql script in your Supabase SQL editor?\n4. Is your internet connection working?')
    process.exit(1)
  }
  
  await migrateUsers()
  await migrateAITools()
  await migrateCourses()
  await migrateEnrollments()
  await migrateAIEnrollments()
  await migrateReviews()
  
  console.log('Database migration completed!')
  
  await prisma.$disconnect()
}

// Run the migration
migrateAll().catch(async (error) => {
  console.error('Migration failed:', error)
  await prisma.$disconnect()
  process.exit(1)
})