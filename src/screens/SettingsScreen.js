// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = ({ onLogout }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Settings ⚙️
      </Text>
      
      <TouchableOpacity
        style={[styles.settingButton, { backgroundColor: theme.surface }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.settingText, { color: theme.text }]}>
          🌓 Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: '#dc3545' }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          🚪 Logout
        </Text>
      </TouchableOpacity>
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
  settingButton: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
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
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  logoutButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
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