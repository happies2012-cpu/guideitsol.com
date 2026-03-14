// Replaced Firebase Auth with local API client calls
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';

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

const API_URL = '/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'API request failed');
    }

    return response.json();
}

export const registerWithEmail = async (email: string, password: string, displayName: string, role: UserRole = 'USER'): Promise<AppUser> => {
    const data = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name: displayName, role }),
    });
    if (data.token) {
        localStorage.setItem('auth_token', data.token);
    }
    return { ...data.user, uid: data.user.id, displayName: data.user.name };
};

export const loginWithEmail = async (email: string, password: string): Promise<AppUser> => {
    const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (data.token) {
        localStorage.setItem('auth_token', data.token);
    }
    return { ...data.user, uid: data.user.id, displayName: data.user.name };
};

export const loginWithGoogle = async (): Promise<AppUser> => {
    throw new Error("Google login is disabled in self-contained mode");
};

export const logout = async (): Promise<void> => {
    localStorage.removeItem('auth_token');
};

export const resetPassword = async (email: string): Promise<void> => {
    // Mock local implementation
    console.log("Password reset requested for", email);
};

export const getUserData = async (uid: string): Promise<AppUser> => {
    const data = await fetchAPI('/auth/me');
    return { ...data.user, uid: data.user.id, displayName: data.user.name };
};

export const checkAuthStatus = async (): Promise<AppUser | null> => {
    if (!localStorage.getItem('auth_token')) return null;
    try {
        const data = await fetchAPI('/auth/me');
        return data.user ? { ...data.user, uid: data.user.id, displayName: data.user.name } : null;
    } catch {
        localStorage.removeItem('auth_token');
        return null;
    }
};

export const updateUserProfile = async (uid: string, data: Partial<AppUser>): Promise<void> => {
    console.log("Mock update user profile", data);
};

export const updateUserEmail = async (newEmail: string, currentPassword: string): Promise<void> => {
    console.log("Mock update email", newEmail);
};

export const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    console.log("Mock update password");
};

export const updateUserRole = async (uid: string, role: UserRole, adminUid: string): Promise<void> => {
    console.log("Mock update user role");
};

export const getAllUsers = async (adminUid: string): Promise<AppUser[]> => {
    return [];
};

export const hasPermission = (user: AppUser | null, permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
};

export const hasRole = (user: AppUser | null, roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
};
