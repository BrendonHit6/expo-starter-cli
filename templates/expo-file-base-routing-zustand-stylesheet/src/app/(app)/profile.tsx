import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';
import Avatar from '@/components/Avatar';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, spacing, fontSize, fontWeight } from '@/theme';

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={90} />
        <Text style={styles.name}>{user?.name ?? '—'}</Text>
        <Text style={styles.email}>{user?.email ?? '—'}</Text>
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
  name: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.xxs,
  },
  email: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
