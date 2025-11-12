import { supabase } from './supabase'
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient()

// Database service that can work with both SQLite and Supabase
export class DatabaseService {
  // Check if Supabase is available
  static async isSupabaseAvailable(): Promise<boolean> {
    try {
      // Simple health check
      const { data, error } = await supabase
        .from('users')
        .select('count()', { count: 'exact' })
        .limit(1)
      
      return !error
    } catch (error) {
      console.warn('Supabase is not available, falling back to SQLite')
      return false
    }
  }

  // User operations
  static async createUser(userData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert(userData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createUser failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.user.create({
      data: userData
    })
  }

  static async getUserByEmail(email: string) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single()
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getUserByEmail failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.user.findUnique({
      where: { email }
    })
  }

  static async updateUser(id: string, userData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('users')
          .update(userData)
          .eq('id', id)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase updateUser failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.user.update({
      where: { id },
      data: userData
    })
  }

  // AI Tool operations
  static async createAITool(toolData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .insert(toolData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createAITool failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.aITool.create({
      data: toolData
    })
  }

  static async getAITools() {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getAITools failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.aITool.findMany()
  }

  // Course operations
  static async createCourse(courseData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('courses')
          .insert(courseData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createCourse failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.courses.create({
      data: courseData
    })
  }

  static async getCourses() {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getCourses failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.courses.findMany({
      include: {
        category: true
      }
    })
  }

  // Enrollment operations
  static async createEnrollment(enrollmentData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .insert(enrollmentData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createEnrollment failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.enrollments.create({
      data: enrollmentData
    })
  }

  static async getEnrollmentsByUser(userId: string) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('userId', userId)
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getEnrollmentsByUser failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.enrollments.findMany({
      where: { userId },
      include: {
        course: true
      }
    })
  }

  // AI Enrollment operations
  static async createAIEnrollment(enrollmentData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('ai_enrollments')
          .insert(enrollmentData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createAIEnrollment failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.aIEnrollments.create({
      data: enrollmentData
    })
  }

  static async getAIEnrollmentsByUser(userId: string) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('ai_enrollments')
          .select(`
            *,
            tool:ai_tools(*)
          `)
          .eq('userId', userId)
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getAIEnrollmentsByUser failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.aIEnrollments.findMany({
      where: { userId },
      include: {
        tool: true
      }
    })
  }

  // Review operations
  static async createReview(reviewData: any) {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .insert(reviewData)
          .select()
        
        if (!error && data) {
          return data[0]
        }
      } catch (error) {
        console.warn('Supabase createReview failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.review.create({
      data: reviewData
    })
  }

  static async getReviews() {
    // Try Supabase first if available
    if (await this.isSupabaseAvailable()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            user:users(name),
            tool:ai_tools(name),
            course:courses(title)
          `)
        
        if (!error && data) {
          return data
        }
      } catch (error) {
        console.warn('Supabase getReviews failed, falling back to SQLite:', error)
      }
    }
    
    // Fallback to SQLite
    return await prisma.review.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        },
        tool: {
          select: {
            name: true
          }
        },
        course: {
          select: {
            title: true
          }
        }
      }
    })
  }
}

export default DatabaseService