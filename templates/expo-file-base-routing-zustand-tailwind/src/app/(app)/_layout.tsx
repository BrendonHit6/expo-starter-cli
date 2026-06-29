import React from 'react';
import { Tabs } from 'expo-router/tabs';
import type { BottomTabNavigationOptions } from 'expo-router/src/react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  index: { active: 'home', inactive: 'home-outline' },
  notifications: { active: 'notifications', inactive: 'notifications-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
  settings: { active: 'settings', inactive: 'settings-outline' },
};

function getScreenOptions({ route }: { route: { name: string } }): BottomTabNavigationOptions {
  const icons = TAB_ICONS[route.name] ?? { active: 'ellipse' as IoniconName, inactive: 'ellipse-outline' as IoniconName };
  return {
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textMuted,
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
      <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />
    ),
  };
}

export default function AppLayout() {
  return (
    <Tabs screenOptions={getScreenOptions}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
