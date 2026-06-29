import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface ILoaderProps {
  visible: boolean;
  color?: string;
}

export default function Loader({ visible, color = '#fff' }: ILoaderProps) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-overlay-dark items-center justify-center z-[999]">
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}
