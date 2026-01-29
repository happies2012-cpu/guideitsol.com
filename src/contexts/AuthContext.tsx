import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  AppUser,
  UserRole,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  logout as firebaseLogout,
  getUserData,
  resetPassword,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
  updateUserRole,
  hasPermission,
  hasRole
} from '@/lib/firebase-auth';

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  // Profile management
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
  updateEmail: (newEmail: string, currentPassword: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  // Authorization
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  // Admin functions
  updateUserRole: (uid: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          setFirebaseUser(firebaseUser);

          // Get user data from Firestore
          const userData = await getUserData(firebaseUser.uid);
          setUser(userData);
        } else {
          // User is signed out
          setFirebaseUser(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setFirebaseUser(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await loginWithEmail(email, password);
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userData = await loginWithGoogle();
      setUser(userData);
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole = 'USER'
  ) => {
    try {
      setLoading(true);
      const userData = await registerWithEmail(email, password, name, role);
      setUser(userData);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      setFirebaseUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Logout failed');
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const handleUpdateProfile = async (data: Partial<AppUser>) => {
    try {
      if (!user) throw new Error('No user logged in');
      await updateUserProfile(user.uid, data);

      // Update local state
      setUser({ ...user, ...data });
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const handleUpdateEmail = async (newEmail: string, currentPassword: string) => {
    try {
      await updateUserEmail(newEmail, currentPassword);

      // Update local state
      if (user) {
        setUser({ ...user, email: newEmail });
      }
    } catch (error: any) {
      console.error('Update email error:', error);
      throw new Error(error.message || 'Failed to update email');
    }
  };

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await updateUserPassword(currentPassword, newPassword);
    } catch (error: any) {
      console.error('Update password error:', error);
      throw new Error(error.message || 'Failed to update password');
    }
  };

  const handleUpdateUserRole = async (uid: string, role: UserRole) => {
    try {
      if (!user) throw new Error('No user logged in');
      await updateUserRole(uid, role, user.uid);
    } catch (error: any) {
      console.error('Update user role error:', error);
      throw new Error(error.message || 'Failed to update user role');
    }
  };

  const checkPermission = (permission: string): boolean => {
    return hasPermission(user, permission);
  };

  const checkRole = (roles: UserRole | UserRole[]): boolean => {
    return hasRole(user, roles);
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    // Authentication methods
    login,
    loginWithGoogle: handleGoogleLogin,
    register,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    // Profile management
    updateProfile: handleUpdateProfile,
    updateEmail: handleUpdateEmail,
    updatePassword: handleUpdatePassword,
    // Authorization
    isAuthenticated: !!user && !!firebaseUser,
    isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
    isEditor: user?.role === 'EDITOR',
    isViewer: user?.role === 'VIEWER',
    hasPermission: checkPermission,
    hasRole: checkRole,
    // Admin functions
    updateUserRole: handleUpdateUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
