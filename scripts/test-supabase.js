#!/usr/bin/env node

// Script to test Supabase connection

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://supabase.guideitsol.com'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2Mjg1ODAyMCwiZXhwIjo0OTE4NTMxNjIwLCJyb2xlIjoiYW5vbiJ9._a2-f349rsEhjI3885KwU72jrIPD0spnygpCOxRQsKk'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set')

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test health check
    const { data, error } = await supabase
      .from('users')
      .select('count()', { count: 'exact' })
      .limit(1)
    
    if (error) {
      console.error('Connection failed:', error.message)
      showHelp()
      return false
    }
    
    console.log('Connection successful!')
    console.log('Data:', data)
    return true
  } catch (error) {
    console.error('Connection failed:', error.message)
    showHelp()
    return false
  }
}

function showHelp() {
  console.log('\n⚠️  Supabase Setup Help:')
  console.log('----------------------')
  
  // Check if setup instructions exist
  const setupFiles = [
    'SUPABASE_SETUP_INSTRUCTIONS.md',
    'SUPABASE_SETUP_SUMMARY.md'
  ]
  
  for (const file of setupFiles) {
    if (fs.existsSync(file)) {
      console.log(`See ${file} for detailed setup instructions`)
      return
    }
  }
  
  console.log('\nTo set up Supabase:')
  console.log('1. Create a project at https://app.supabase.com/')
  console.log('2. Update SUPABASE_URL and SUPABASE_ANON_KEY in your .env file')
  console.log('3. Run the schema.sql script in your Supabase SQL editor')
  console.log('4. Run: npm run migrate:supabase')
}

// Run the test
testConnection().then(success => {
  if (success) {
    console.log('✅ Supabase connection test passed')
  } else {
    console.log('❌ Supabase connection test failed')
  }
  process.exit(success ? 0 : 1)
})