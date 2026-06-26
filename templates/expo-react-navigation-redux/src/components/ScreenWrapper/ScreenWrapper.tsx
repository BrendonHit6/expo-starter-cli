import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

interface IScreenWrapperProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export default function ScreenWrapper({ children, withPadding = true }: IScreenWrapperProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={withPadding ? styles.inner : { flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
