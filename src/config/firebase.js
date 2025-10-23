// firebase.js
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
let auth;
const initializeAuth = async () => {
  try {
    const authModule = await import('firebase/auth');
    
    try {
      auth = authModule.initializeAuth(app, {
        persistence: authModule.getReactNativePersistence(AsyncStorage)
      });
      console.log('✅ Auth initialized with AsyncStorage persistence');
    } catch (persistenceError) {
      console.log('⚠️ Persistence failed, falling back to memory-only auth:', persistenceError.message);
      auth = authModule.getAuth(app);
      console.log('✅ Auth initialized with memory persistence');
    }
    
    return auth;
  } catch (error) {
    console.error('❌ Auth initialization error:', error);
    throw error;
  }
};

// Initialize Firestore
let db;
const initializeFirestore = async () => {
  try {
    const firestoreModule = await import('firebase/firestore');
    db = firestoreModule.getFirestore(app);
    console.log('✅ Firestore initialized');
    return db;
  } catch (error) {
    console.error('❌ Firestore initialization error:', error);
    throw error;
  }
};

// Export the initializers and app
export { initializeAuth, initializeFirestore, app };