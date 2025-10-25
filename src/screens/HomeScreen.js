// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = () => {
  const { testData } = useData();
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Welcome to Your App! 🎉
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Hello, {user?.email || 'User'}!
      </Text>
      <Text style={[styles.testData, { color: theme.primary }]}>
        Test Data: {testData}
      </Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        This is your home screen template.{'\n'}
        Customize it for your app! 🚀
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  testData: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;