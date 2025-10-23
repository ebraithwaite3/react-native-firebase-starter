// DataContext.js - Basic Template
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user, db } = useAuth();
  
  // Basic test data
  const testData = "Hi!";
  
  // Add your app-specific state here
  const [loading, setLoading] = useState(false);
  
  // TODO: Add your app's data management logic here
  // Examples:
  // - const [posts, setPosts] = useState([]);
  // - const [userProfile, setUserProfile] = useState(null);
  // - const [appSpecificData, setAppSpecificData] = useState([]);

  const value = {
    testData,
    loading,
    user,
    db,
    // Add your app-specific values here
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};