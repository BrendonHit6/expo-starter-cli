import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import { fontSize, fontWeight, spacing } from '@/theme';

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
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
    marginBottom: spacing.xl,
  },
  buttonWrapper: {
    width: '80%',
  },
});
