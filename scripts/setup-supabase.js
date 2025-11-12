#!/usr/bin/env node

// Script to guide the user through Supabase setup

console.log(`
=====================================
Supabase Setup Guide
=====================================

This script will guide you through setting up Supabase for your Guidesoft website.

Step 1: Create a Supabase Account and Project
--------------------------------------------
1. Go to https://app.supabase.com/
2. Sign up for a free account or sign in if you already have one
3. Click "New Project"
4. Choose an organization or create a new one
5. Enter a name for your project (e.g., "guideitsol")
6. Set a secure database password
7. Select a region closest to your users
8. Click "Create New Project"

Step 2: Get Your Project Credentials
------------------------------------
After your project is created:

1. Click on your project to open it
2. In the left sidebar, click on "Project Settings" (gear icon)
3. Click on "API" in the settings menu
4. Copy the following values:
   - Project URL (this will be your SUPABASE_URL)
   - anon key (this will be your SUPABASE_ANON_KEY)

Step 3: Update Environment Variables
------------------------------------
Update your .env file with the actual values from your Supabase project:

# Supabase Configuration
SUPABASE_URL="https://your-actual-project.supabase.co"
SUPABASE_ANON_KEY="your-actual-anon-key"
VITE_SUPABASE_URL="https://your-actual-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-actual-anon-key"

Step 4: Set Up Database Schema
------------------------------
1. In the Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Copy the contents of supabase/schema.sql from this project
3. Paste it into the SQL editor
4. Click "Run" to create all the tables

Step 5: Run the Migration Script
--------------------------------
After setting up your Supabase project and updating the environment variables:

npm run migrate:supabase

This will migrate your existing SQLite data to Supabase.

Step 6: Test the Connection
---------------------------
Run the test script to verify everything is working:

node scripts/test-supabase.js

You should see a "✅ Supabase connection test passed" message.

For more detailed instructions, see SUPABASE_SETUP_INSTRUCTIONS.md
`);