import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
