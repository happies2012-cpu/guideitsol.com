# Supabase Integration Guide

This document explains how to integrate Supabase with the Guidesoft website.

## Prerequisites

1. Supabase account and project
2. Supabase URL and API keys
3. Supabase CLI (optional, for local development)

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Supabase Configuration
SUPABASE_URL="https://supabase.guideitsol.com"
SUPABASE_ANON_KEY="your-supabase-anon-key"
VITE_SUPABASE_URL="https://supabase.guideitsol.com"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Supabase Setup

1. Create a new Supabase project at https://app.supabase.com/
2. Copy the Supabase URL and anon key from the project settings
3. Update the environment variables in your `.env` file
4. Run the Supabase schema script to create tables:
   ```bash
   # Copy the schema.sql content to your Supabase SQL editor and run it
   ```

## Database Service

The application uses a dual database approach:
- Primary: Supabase (PostgreSQL)
- Fallback: SQLite (Prisma)

The `DatabaseService` class in `src/lib/database.ts` handles both databases automatically.

## Migration

To migrate existing data from SQLite to Supabase:

```bash
npm run migrate:supabase
```

This script will transfer all existing data from the SQLite database to Supabase.

## Usage in Components

To use the Supabase integration in your components:

```typescript
import { DatabaseService } from '@/lib/database'

// Example: Get all AI tools
const tools = await DatabaseService.getAITools()

// Example: Create a new user
const newUser = await DatabaseService.createUser({
  email: 'user@example.com',
  name: 'John Doe',
  // ... other user data
})
```

## Authentication

Supabase authentication can be integrated as follows:

```typescript
import { supabase } from '@/lib/supabase'

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Sign out
await supabase.auth.signOut()
```

## Realtime Features

Supabase provides realtime capabilities:

```typescript
import { supabase } from '@/lib/supabase'

// Subscribe to changes in the users table
const subscription = supabase
  .channel('users-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'users',
    },
    (payload) => {
      console.log('New user:', payload.new)
    }
  )
  .subscribe()
```

## Storage

Supabase storage can be used for file uploads:

```typescript
import { supabase } from '@/lib/supabase'

// Upload a file
const { data, error } = await supabase.storage
  .from('files')
  .upload('path/to/file', file)

// Download a file
const { data, error } = await supabase.storage
  .from('files')
  .download('path/to/file')
```

## Security

The integration follows these security practices:
1. Uses environment variables for API keys
2. Implements proper error handling
3. Falls back to SQLite if Supabase is unavailable
4. Uses parameterized queries to prevent SQL injection

## Troubleshooting

Common issues:
1. Connection errors - Check Supabase URL and API keys
2. Authentication errors - Verify user credentials
3. Permission errors - Check Supabase policies
4. Migration errors - Ensure schema matches Prisma models

For more information, refer to the Supabase documentation:
https://supabase.com/docs