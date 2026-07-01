import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

import HomeScreen from '../screens/main/HomeScreen';
import CardScreen from '../screens/main/CardScreen';
import QueueScreen from '../screens/main/QueueScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import NewsScreen from '../screens/main/NewsScreen';
import FaqScreen from '../screens/main/FaqScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 65,
      height: 65,
      borderRadius: 35,
      backgroundColor: COLORS.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryLight,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="NewsTab"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Berita',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="CardTab"
        component={CardScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" color={COLORS.white} size={28} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <Tab.Screen
        name="FAQTab"
        component={FaqScreen}
        options={{
          tabBarLabel: 'FAQ',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  }
});
