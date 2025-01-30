import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFE81F',
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#1a1a1a',
            borderTopColor: 'rgba(255,255,255,0.1)',
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
          },
          default: {
            backgroundColor: '#1a1a1a',
            borderTopColor: 'rgba(255,255,255,0.1)',
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        }),
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="filmstrip" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="hello-from-carlos"
        options={{
          title: 'Hello',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hand-wave" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
