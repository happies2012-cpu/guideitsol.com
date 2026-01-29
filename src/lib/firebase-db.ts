import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    addDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from './firebase';

// Helper for dates
const now = () => serverTimestamp();

// --- TYPES ---

export interface Page {
    id?: string;
    title: string;
    slug: string;
    content?: string;
    description?: string;
    published: boolean;
    createdAt?: any;
    updatedAt?: any;
}

export interface AITool {
    id?: string;
    name: string;
    description: string;
    category: string;
    icon?: string;
    url?: string;
    tags: string;
    featured: boolean;
    pricing?: string;
    createdAt?: any;
    updatedAt?: any;
}

// --- API IMPLEMENTATIONS ---

export const pagesDB = {
    getAll: async () => {
        try {
            const q = query(collection(db, 'pages'), orderBy('updatedAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Page));
        } catch (error) {
            console.error('Error fetching pages:', error);
            return [];
        }
    },

    getBySlug: async (slug: string) => {
        try {
            const q = query(collection(db, 'pages'), where('slug', '==', slug), limit(1));
            const snapshot = await getDocs(q);
            if (snapshot.empty) return null;
            return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Page;
        } catch (error) {
            console.error('Error fetching page:', error);
            return null;
        }
    },

    create: async (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const docRef = await addDoc(collection(db, 'pages'), {
                ...data,
                createdAt: now(),
                updatedAt: now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating page:', error);
            throw error;
        }
    },

    update: async (id: string, data: Partial<Page>) => {
        try {
            const docRef = doc(db, 'pages', id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: now()
            });
        } catch (error) {
            console.error('Error updating page:', error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            await deleteDoc(doc(db, 'pages', id));
        } catch (error) {
            console.error('Error deleting page:', error);
            throw error;
        }
    }
};

export const aiToolsDB = {
    getAll: async () => {
        try {
            const q = query(collection(db, 'ai_tools'), orderBy('name', 'asc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AITool));
        } catch (error) {
            console.error('Error fetching AI tools:', error);
            return [];
        }
    },

    create: async (data: Omit<AITool, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const docRef = await addDoc(collection(db, 'ai_tools'), {
                ...data,
                createdAt: now(),
                updatedAt: now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating AI tool:', error);
            throw error;
        }
    },

    update: async (id: string, data: Partial<AITool>) => {
        try {
            const docRef = doc(db, 'ai_tools', id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: now()
            });
        } catch (error) {
            console.error('Error updating AI tool:', error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            await deleteDoc(doc(db, 'ai_tools', id));
        } catch (error) {
            console.error('Error deleting AI tool:', error);
            throw error;
        }
    }
};
