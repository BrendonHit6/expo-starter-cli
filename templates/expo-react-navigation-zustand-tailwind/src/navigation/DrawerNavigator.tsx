import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store/userStore';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/Avatar';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { colors } from '../theme';

export type DrawerParamList = {
  Home: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const DRAWER_ICONS: Record<keyof DrawerParamList, IoniconName> = {
  Home: 'home-outline',
  Notifications: 'notifications-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
};

function DrawerHeader() {
  const user = useUserStore(state => state.user);

  return (
    <View className="p-6 border-b border-border mb-2">
      <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={60} />
      <Text className="text-base font-bold mt-2 text-text-primary">{user?.name ?? '—'}</Text>
      <Text className="text-xs text-text-secondary mt-1">{user?.email ?? '—'}</Text>
    </View>
  );
}

function DrawerFooter() {
  const { logout } = useAuth();

  return (
    <TouchableOpacity className="flex-row items-center gap-2 p-4" onPress={logout}>
      <Ionicons name="log-out-outline" size={20} color={colors.error} />
      <Text className="text-sm text-error font-medium">Log Out</Text>
    </TouchableOpacity>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <View className="mt-auto border-t border-border">
        <DrawerFooter />
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: true,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerIcon: ({ color, size }) => {
          const iconName = DRAWER_ICONS[route.name as keyof DrawerParamList];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
