// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const ProfileScreen = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Profile 👤
      </Text>
      
      <View style={[styles.infoSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Email:
        </Text>
        <Text style={[styles.value, { color: theme.textPrimary }]}>
          {user?.email || 'Not available'}
        </Text>
      </View>

      <View style={[styles.infoSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          User ID:
        </Text>
        <Text style={[styles.value, { color: theme.textPrimary }]}>
          {user?.uid || 'Not available'}
        </Text>
      </View>

      <View style={[styles.infoSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Status:
        </Text>
        <Text style={[styles.value, { color: theme.success }]}>
          ✅ Logged In
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    // Removed fixed backgroundColor - now uses theme
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
  },
});

export default ProfileScreen;