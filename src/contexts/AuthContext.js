// AuthContext.js - Generic Template Version
import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeAuth, initializeFirestore } from '../config/firebase';
import { DateTime } from 'luxon';

// 🎯 APP CONFIGURATION: Change these for each new app
const APP_CONFIG = {
  // Change this prefix for each app (e.g., 'todo', 'sports', 'blog')
  collectionPrefix: 'myapp', // 👈 CHANGE THIS FOR EACH APP
  
  // Collections this app will use
  collections: {
    users: 'myapp_users',           // 👈 Will become: todo_users, sports_users, etc.
    // Add more collections as needed:
    // posts: 'myapp_posts',
    // data: 'myapp_data',
  }
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const setupAuth = async () => {
      try {
        console.log('Setting up auth...');
        
        // Initialize both auth and firestore
        const [authInstance, dbInstance] = await Promise.all([
          initializeAuth(),
          initializeFirestore()
        ]);
        
        setAuth(authInstance);
        setDb(dbInstance);
        
        // Import auth functions dynamically
        const authModule = await import('firebase/auth');
        
        // Set up auth state listener
        const unsubscribe = authModule.onAuthStateChanged(authInstance, (user) => {
          console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
          setUser(user);
          setLoading(false);
        });
        
        return unsubscribe;
      } catch (error) {
        console.error('Auth setup error:', error);
        setLoading(false);
      }
    };

    setupAuth();
  }, []);

  // Helper function to create user document in Firestore
  const createUserDocument = async (user, username, additionalData = {}) => {
    if (!user || !db) return;
    
    try {
      const firestoreModule = await import('firebase/firestore');
      const { DateTime } = await import('luxon');
      
      // 🎯 APP-SPECIFIC: Uses the configured collection name
      const userRef = firestoreModule.doc(db, APP_CONFIG.collections.users, user.uid);
      
      // Check if user document already exists
      const userSnapshot = await firestoreModule.getDoc(userRef);
      
      if (!userSnapshot.exists()) {
        const now = DateTime.now().toISO();
        const userData = {
          userId: user.uid,
          email: user.email,
          username: username,
          createdAt: now,
          updatedAt: now,
          isActive: true,
          profilePicture: user.photoURL || null,
          preferences: {
            theme: 'system',
            defaultTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            notifications: true,
            // 🎯 ADD APP-SPECIFIC PREFERENCES HERE
            // Examples:
            // defaultView: 'list',
            // sortBy: 'date',
            // showCompleted: false,
          },
          // 🎯 ADD APP-SPECIFIC FIELDS HERE
          // Examples:
          // posts: [],
          // favorites: [],
          // settings: {},
          ...additionalData
        };
        
        await firestoreModule.setDoc(userRef, userData);
        console.log('User document created:', userData);
        return userData;
      } else {
        // Update last login time
        const now = DateTime.now().toISO();
        await firestoreModule.updateDoc(userRef, {
          updatedAt: now
        });
        console.log('User document exists, updated timestamp');
        return userSnapshot.data();
      }
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  };

  const login = async (email, password) => {
    if (!auth) throw new Error('Auth not initialized');
    const authModule = await import('firebase/auth');
    return authModule.signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, username, additionalData = {}) => {
    if (!auth) throw new Error('Auth not initialized');
    const authModule = await import('firebase/auth');
    
    try {
      // Create Firebase auth user
      const result = await authModule.createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await createUserDocument(result.user, username, additionalData);
      console.log('User profile created successfully');
      
      // 🎯 TODO: ADD APP-SPECIFIC INITIALIZATION HERE
      // Examples:
      // - await createUserPostsCollection(result.user.uid);
      // - await createUserDataCollection(result.user.uid);
      // - await sendWelcomeMessage(result.user.uid);
      // - await initializeAppSettings(result.user.uid);
      
      return result;
    } catch (error) {
      console.error('Signup failed:', error);
      
      // If user document creation fails, clean up auth user
      try {
        if (result?.user) {
          await result.user.delete();
          console.log('Cleaned up auth user after failed signup');
        }
      } catch (cleanupError) {
        console.error('Auth cleanup failed:', cleanupError);
      }
      
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) throw new Error('Auth not initialized');
    const authModule = await import('firebase/auth');
    return authModule.signOut(auth);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    auth,
    db,
    createUserDocument,
    APP_CONFIG, // 🎯 Export config so other files can use it
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};