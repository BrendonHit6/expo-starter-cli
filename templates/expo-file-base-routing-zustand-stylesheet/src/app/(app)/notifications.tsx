import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { colors, fontSize, fontWeight, spacing } from '@/theme';

export default function NotificationsScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>No new notifications</Text>
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
