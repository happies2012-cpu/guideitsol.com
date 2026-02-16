import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDBjxGNNBNiBDuxFyUfdAODqbraBgKg02E",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "guidesoftapps.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "guidesoftapps",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "guidesoftapps.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "43088220146",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:43088220146:web:0f98e23f1fc1c2dbf9e56b",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XWE6VYC73S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
let analytics: any = null;

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
    import('firebase/analytics').then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
    }).catch(err => console.error("Firebase Analytics failed to load", err));
}

// Connect to emulators in development
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

export { analytics };
export default app;
