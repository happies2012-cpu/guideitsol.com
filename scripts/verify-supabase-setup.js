#!/usr/bin/env node

// Script to verify Supabase setup files

import fs from 'fs'
import path from 'path'

const requiredFiles = [
  '.env',
  'supabase/schema.sql',
  'src/lib/supabase.ts',
  'src/lib/database.ts',
  'scripts/migrate-to-supabase.js',
  'scripts/test-supabase.js',
  'scripts/setup-supabase.js',
  'SUPABASE_SETUP_INSTRUCTIONS.md',
  'SUPABASE_SETUP_SUMMARY.md'
]

const packageJsonScripts = [
  'migrate:supabase',
  'setup:supabase'
]

console.log('🔍 Verifying Supabase setup files...\n')

let allFilesExist = true
for (const file of requiredFiles) {
  const fullPath = path.join(process.cwd(), file)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} (MISSING)`)
    allFilesExist = false
  }
}

console.log('\n🔍 Verifying package.json scripts...\n')

// Read package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  
  for (const script of packageJsonScripts) {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ npm run ${script}`)
    } else {
      console.log(`❌ npm run ${script} (MISSING)`)
    }
  }
} catch (error) {
  console.log('❌ Could not read package.json')
}

console.log('\n📋 Summary:')
if (allFilesExist) {
  console.log('✅ All required files are present')
  console.log('\nNext steps:')
  console.log('1. Create a Supabase project at https://app.supabase.com/')
  console.log('2. Update your .env file with the project credentials')
  console.log('3. Run the schema.sql script in your Supabase SQL editor')
  console.log('4. Run: npm run migrate:supabase')
  console.log('5. Test: node scripts/test-supabase.js')
} else {
  console.log('❌ Some required files are missing')
  console.log('Please check the file structure and ensure all files are present')
}