import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IScreenWrapperProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export default function ScreenWrapper({ children, withPadding = true }: IScreenWrapperProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={withPadding ? 'flex-1 px-4' : 'flex-1'}>{children}</View>
    </SafeAreaView>
  );
}
