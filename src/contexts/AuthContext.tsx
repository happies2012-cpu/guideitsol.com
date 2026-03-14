import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppUser,
  UserRole,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  logout as localLogout,
  getUserData,
  checkAuthStatus,
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
  firebaseUser: any | null; // Kept for legacy compatibility
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
  updateEmail: (newEmail: string, currentPassword: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await checkAuthStatus();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
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

  const register = async (email: string, password: string, name: string, role: UserRole = 'USER') => {
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
      await localLogout();
      setUser(null);
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
      setUser({ ...user, ...data });
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const handleUpdateEmail = async (newEmail: string, currentPassword: string) => {
    try {
      await updateUserEmail(newEmail, currentPassword);
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
    firebaseUser: user ? { uid: user.uid, getIdToken: async () => localStorage.getItem('auth_token') } : null,
    loading,
    login,
    loginWithGoogle: handleGoogleLogin,
    register,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    updateProfile: handleUpdateProfile,
    updateEmail: handleUpdateEmail,
    updatePassword: handleUpdatePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
    isEditor: user?.role === 'EDITOR',
    isViewer: user?.role === 'VIEWER',
    hasPermission: checkPermission,
    hasRole: checkRole,
    updateUserRole: handleUpdateUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
