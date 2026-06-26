import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store/userStore';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/Avatar';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { colors, spacing, fontSize, fontWeight } from '../theme';

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
    <View style={styles.header}>
      <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={60} />
      <Text style={styles.name}>{user?.name ?? '—'}</Text>
      <Text style={styles.email}>{user?.email ?? '—'}</Text>
    </View>
  );
}

function DrawerFooter() {
  const { logout } = useAuth();

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Ionicons name="log-out-outline" size={20} color={colors.error} />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <View style={styles.footer}>
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

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginTop: spacing.sm,
    color: colors.textPrimary,
  },
  email: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  footer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  logoutText: {
    fontSize: fontSize.sm,
    color: colors.error,
    fontWeight: fontWeight.medium,
  },
});
