import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacing, fontSize, fontWeight } from '@/theme';

export default function HomeScreen() {
  const { logout } = useAuth();
  const user = useUserStore((state) => state.user);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={80} />
        <Text style={styles.title}>Welcome{user?.name ? `, ${user.name}` : ''}!</Text>
        {user?.email && <Text style={styles.email}>{user.email}</Text>}
        <View style={styles.buttonWrapper}>
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.xxs,
  },
  email: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  buttonWrapper: {
    marginTop: spacing.lg,
    width: '80%',
  },
});
