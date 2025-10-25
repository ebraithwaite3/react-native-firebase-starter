// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // Add this import

const SettingsScreen = () => { // Remove onLogout prop
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { logout } = useAuth(); // Get logout from auth context

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Settings
        </Text>
        
        <TouchableOpacity
          style={[styles.settingButton, { 
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.settingText, { color: theme.textPrimary }]}>
            {isDarkMode ? '☀️' : '🌙'} Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.error || '#dc3545' }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingTop: 60, // Add some top padding instead of centering
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  settingButton: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40, // Fixed spacing instead of flex spacer
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SettingsScreen;