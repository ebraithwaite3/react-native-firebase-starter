// src/navigation/MainNavigator.js
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';

// Simple screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Stack navigators for each tab
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

function TabNavigator({ onLogout }) {
  const { theme } = useTheme();
  
  const getTabBarIcon = (routeName, focused) => {
    let icon;
    
    switch (routeName) {
      case 'Home':
        icon = focused ? '🏠' : '🏡';
        break;
      case 'Profile':
        icon = focused ? '👤' : '👥';
        break;
      case 'Settings':
        icon = focused ? '⚙️' : '🔧';
        break;
      default:
        icon = '❓';
    }
    
    return <Text style={{ fontSize: 20 }}>{icon}</Text>;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary || '#999',
        tabBarStyle: {
          backgroundColor: theme.surface || '#fff',
          borderTopColor: theme.border || '#e0e0e0',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="Settings"
        children={() => <SettingsStackScreen onLogout={onLogout} />}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

const MainNavigator = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <TabNavigator onLogout={onLogout} />
    </NavigationContainer>
  );
};

export default MainNavigator;