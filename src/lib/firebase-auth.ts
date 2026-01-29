import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser,
    updateEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import { auth, db } from './firebase';

// User role types
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';

// User interface
export interface AppUser {
    uid: string;
    email: string;
    displayName: string;
    role: UserRole;
    photoURL?: string;
    createdAt: any;
    updatedAt: any;
    lastLogin: any;
    isActive: boolean;
    permissions?: string[];
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole = 'USER'
): Promise<AppUser> => {
    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update display name
        await updateProfile(user, { displayName });

        // Create user document in Firestore
        const userData: AppUser = {
            uid: user.uid,
            email: user.email!,
            displayName,
            role,
            photoURL: user.photoURL || undefined,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isActive: true,
            permissions: getDefaultPermissions(role)
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        return userData;
    } catch (error: any) {
        console.error('Registration error:', error);
        throw new Error(error.message || 'Failed to register user');
    }
};

/**
 * Sign in with email and password
 */
export const loginWithEmail = async (
    email: string,
    password: string
): Promise<AppUser> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update last login
        await updateDoc(doc(db, 'users', user.uid), {
            lastLogin: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        // Get user data from Firestore
        const userData = await getUserData(user.uid);
        return userData;
    } catch (error: any) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Failed to login');
    }
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async (): Promise<AppUser> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user document exists
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            // Create new user document
            const userData: AppUser = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || 'User',
                role: 'USER',
                photoURL: user.photoURL || undefined,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                isActive: true,
                permissions: getDefaultPermissions('USER')
            };

            await setDoc(doc(db, 'users', user.uid), userData);
            return userData;
        } else {
            // Update last login
            await updateDoc(doc(db, 'users', user.uid), {
                lastLogin: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            return userDoc.data() as AppUser;
        }
    } catch (error: any) {
        console.error('Google login error:', error);
        throw new Error(error.message || 'Failed to login with Google');
    }
};

/**
 * Sign out current user
 */
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        console.error('Logout error:', error);
        throw new Error(error.message || 'Failed to logout');
    }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error('Password reset error:', error);
        throw new Error(error.message || 'Failed to send password reset email');
    }
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (uid: string): Promise<AppUser> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (!userDoc.exists()) {
            throw new Error('User data not found');
        }

        return userDoc.data() as AppUser;
    } catch (error: any) {
        console.error('Get user data error:', error);
        throw new Error(error.message || 'Failed to get user data');
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    uid: string,
    data: Partial<AppUser>
): Promise<void> => {
    try {
        const updateData = {
            ...data,
            updatedAt: serverTimestamp()
        };

        await updateDoc(doc(db, 'users', uid), updateData);

        // Update Firebase Auth profile if display name or photo changed
        if (auth.currentUser && (data.displayName || data.photoURL)) {
            await updateProfile(auth.currentUser, {
                displayName: data.displayName,
                photoURL: data.photoURL
            });
        }
    } catch (error: any) {
        console.error('Update profile error:', error);
        throw new Error(error.message || 'Failed to update profile');
    }
};

/**
 * Update user email
 */
export const updateUserEmail = async (
    newEmail: string,
    currentPassword: string
): Promise<void> => {
    try {
        if (!auth.currentUser) {
            throw new Error('No user logged in');
        }

        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email!,
            currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Update email in Firebase Auth
        await updateEmail(auth.currentUser, newEmail);

        // Update email in Firestore
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            email: newEmail,
            updatedAt: serverTimestamp()
        });
    } catch (error: any) {
        console.error('Update email error:', error);
        throw new Error(error.message || 'Failed to update email');
    }
};

/**
 * Update user password
 */
export const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    try {
        if (!auth.currentUser) {
            throw new Error('No user logged in');
        }

        // Re-authenticate user
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email!,
            currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Update password
        await updatePassword(auth.currentUser, newPassword);
    } catch (error: any) {
        console.error('Update password error:', error);
        throw new Error(error.message || 'Failed to update password');
    }
};

/**
 * Update user role (Admin only)
 */
export const updateUserRole = async (
    uid: string,
    role: UserRole,
    adminUid: string
): Promise<void> => {
    try {
        // Check if admin has permission
        const adminData = await getUserData(adminUid);
        if (adminData.role !== 'SUPER_ADMIN' && adminData.role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can update user roles');
        }

        // Update user role
        await updateDoc(doc(db, 'users', uid), {
            role,
            permissions: getDefaultPermissions(role),
            updatedAt: serverTimestamp()
        });
    } catch (error: any) {
        console.error('Update role error:', error);
        throw new Error(error.message || 'Failed to update user role');
    }
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (adminUid: string): Promise<AppUser[]> => {
    try {
        // Check if admin has permission
        const adminData = await getUserData(adminUid);
        if (adminData.role !== 'SUPER_ADMIN' && adminData.role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can view all users');
        }

        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);

        const users: AppUser[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as AppUser);
        });

        return users;
    } catch (error: any) {
        console.error('Get all users error:', error);
        throw new Error(error.message || 'Failed to get users');
    }
};

/**
 * Get default permissions based on role
 */
function getDefaultPermissions(role: UserRole): string[] {
    const permissions: Record<UserRole, string[]> = {
        SUPER_ADMIN: [
            'users.read',
            'users.create',
            'users.update',
            'users.delete',
            'content.read',
            'content.create',
            'content.update',
            'content.delete',
            'settings.read',
            'settings.update',
            'analytics.read',
            'payments.read',
            'payments.manage'
        ],
        ADMIN: [
            'users.read',
            'users.create',
            'users.update',
            'content.read',
            'content.create',
            'content.update',
            'content.delete',
            'analytics.read',
            'payments.read'
        ],
        EDITOR: [
            'content.read',
            'content.create',
            'content.update',
            'analytics.read'
        ],
        VIEWER: [
            'content.read',
            'analytics.read'
        ],
        USER: [
            'content.read'
        ]
    };

    return permissions[role] || permissions.USER;
}

/**
 * Check if user has permission
 */
export const hasPermission = (user: AppUser | null, permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
};

/**
 * Check if user has role
 */
export const hasRole = (user: AppUser | null, roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
};
