# Firebase Configuration Guide

## Overview
This application now uses Firebase for authentication and Firestore for database storage. This provides a robust, scalable backend with real-time capabilities.

## Required Firebase Services
- **Firebase Authentication** - User authentication with email/password and Google OAuth
- **Cloud Firestore** - NoSQL database for user data and application data
- **Firebase Storage** - File storage (optional, configured for future use)

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `guideitsol` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password** - Enable
   - **Google** - Enable and configure

### 3. Create Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** (we'll set up rules later)
4. Select your preferred location
5. Click "Enable"

### 4. Set Up Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can update their own data (except role and permissions)
      allow update: if request.auth != null 
        && request.auth.uid == userId
        && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'permissions']);
      
      // Only admins can create users or change roles
      allow create, delete: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['ADMIN', 'SUPER_ADMIN'];
      
      // Admins can read all users
      allow read: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['ADMIN', 'SUPER_ADMIN'];
    }
    
    // Add more collections as needed
  }
}
```

### 5. Get Firebase Configuration
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 6. Update Environment Variables

#### Development (.env)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY="your-api-key-here"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"

# Optional: Use Firebase Emulator for local development
VITE_USE_FIREBASE_EMULATOR=false
```

#### Production (.env.production)
```env
# Firebase Configuration (Production)
VITE_FIREBASE_API_KEY="your-production-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

## User Roles and Permissions

### Available Roles
1. **SUPER_ADMIN** - Full system access
2. **ADMIN** - Administrative access (cannot manage other admins)
3. **EDITOR** - Content management access
4. **VIEWER** - Read-only access
5. **USER** - Basic user access

### Permission System
Each role has specific permissions:

#### SUPER_ADMIN Permissions
- `users.read`, `users.create`, `users.update`, `users.delete`
- `content.read`, `content.create`, `content.update`, `content.delete`
- `settings.read`, `settings.update`
- `analytics.read`
- `payments.read`, `payments.manage`

#### ADMIN Permissions
- `users.read`, `users.create`, `users.update`
- `content.read`, `content.create`, `content.update`, `content.delete`
- `analytics.read`
- `payments.read`

#### EDITOR Permissions
- `content.read`, `content.create`, `content.update`
- `analytics.read`

#### VIEWER Permissions
- `content.read`
- `analytics.read`

#### USER Permissions
- `content.read`

## Usage Examples

### Check User Role
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAdmin, isSuperAdmin, hasRole } = useAuth();
  
  // Check specific role
  if (isAdmin) {
    // Admin-only content
  }
  
  // Check multiple roles
  if (hasRole(['ADMIN', 'SUPER_ADMIN'])) {
    // Admin or Super Admin content
  }
}
```

### Check Permissions
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { hasPermission } = useAuth();
  
  // Check specific permission
  if (hasPermission('users.delete')) {
    // Show delete button
  }
  
  if (hasPermission('content.create')) {
    // Show create content button
  }
}
```

### Login with Email
```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  
  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}
```

### Login with Google
```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { loginWithGoogle } = useAuth();
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Redirect to dashboard
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };
}
```

### Register New User
```typescript
import { useAuth } from '@/contexts/AuthContext';

function RegisterForm() {
  const { register } = useAuth();
  
  const handleSubmit = async (email: string, password: string, name: string) => {
    try {
      await register(email, password, name);
      // Redirect to dashboard
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
}
```

## Firestore Data Structure

### Users Collection
```
/users/{userId}
  - uid: string
  - email: string
  - displayName: string
  - role: UserRole
  - photoURL: string (optional)
  - createdAt: timestamp
  - updatedAt: timestamp
  - lastLogin: timestamp
  - isActive: boolean
  - permissions: string[]
```

## Migration from Old Auth System

### Steps to Migrate
1. **Install Firebase** (already done)
2. **Update AuthContext** (already done)
3. **Update Login/Register pages** to use new auth methods
4. **Create super admin user** in Firebase Console or via script
5. **Migrate existing users** (if any) to Firestore
6. **Update protected routes** to use new auth context
7. **Test all authentication flows**

### Creating First Super Admin
```typescript
// Use Firebase Console or create via script
import { registerWithEmail } from '@/lib/firebase-auth';

const createSuperAdmin = async () => {
  await registerWithEmail(
    'admin@guideitsol.com',
    'secure-password-here',
    'Super Admin',
    'SUPER_ADMIN'
  );
};
```

## Security Best Practices

1. **Never expose Firebase config in public repos** - Use environment variables
2. **Set up proper Firestore security rules** - Restrict access based on roles
3. **Enable App Check** - Protect against abuse
4. **Use Firebase Admin SDK** for server-side operations (if needed)
5. **Implement rate limiting** - Prevent brute force attacks
6. **Enable 2FA** for admin accounts (future enhancement)
7. **Regular security audits** - Review access logs and permissions

## Troubleshooting

### Issue: Firebase not initialized
**Solution:** Check that all environment variables are set correctly

### Issue: Permission denied
**Solution:** Check Firestore security rules and user role/permissions

### Issue: Google login not working
**Solution:** Ensure Google OAuth is enabled in Firebase Console and authorized domains are configured

### Issue: User data not found
**Solution:** Ensure user document is created in Firestore during registration

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**Last Updated:** 2026-01-29  
**Status:** Production Ready ✅
