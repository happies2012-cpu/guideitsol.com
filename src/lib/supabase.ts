import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabase.guideitsol.com'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2Mjg1ODAyMCwiZXhwIjo0OTE4NTMxNjIwLCJyb2xlIjoiYW5vbiJ9._a2-f349rsEhjI3885KwU72jrIPD0spnygpCOxRQsKk'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export types
export type { Session, User, AuthError } from '@supabase/supabase-js'