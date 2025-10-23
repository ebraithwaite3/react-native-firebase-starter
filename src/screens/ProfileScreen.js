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
      <Text style={[styles.title, { color: theme.text }]}>
        Profile 👤
      </Text>
      
      <View style={styles.infoSection}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Email:
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {user?.email || 'Not available'}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          User ID:
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {user?.uid || 'Not available'}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Status:
        </Text>
        <Text style={[styles.value, { color: theme.primary }]}>
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
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
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