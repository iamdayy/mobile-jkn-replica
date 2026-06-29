import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

import HomeScreen from '../screens/main/HomeScreen';
import CardScreen from '../screens/main/CardScreen';
import QueueScreen from '../screens/main/QueueScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CardTab') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'QueueTab') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        }
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Beranda' }} 
      />
      <Tab.Screen 
        name="CardTab" 
        component={CardScreen} 
        options={{ tabBarLabel: 'Kartu' }} 
      />
      <Tab.Screen 
        name="QueueTab" 
        component={QueueScreen} 
        options={{ tabBarLabel: 'Antrean' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Profil' }} 
      />
    </Tab.Navigator>
  );
}
