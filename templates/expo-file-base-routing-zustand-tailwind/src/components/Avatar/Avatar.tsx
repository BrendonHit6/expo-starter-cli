import React from 'react';
import { View, Text, Image } from 'react-native';
import { getInitials } from './helper';

interface IAvatarProps {
  name: string;
  uri?: string;
  size?: number;
}

export default function Avatar({ name, uri, size = 48 }: IAvatarProps) {
  const circleStyle = { width: size, height: size, borderRadius: size / 2 };
  const textFontSize = size * 0.38;

  return (
    <View className="bg-primary items-center justify-center overflow-hidden" style={circleStyle}>
      {uri ? (
        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Text className="text-white font-semibold" style={{ fontSize: textFontSize }}>{getInitials(name)}</Text>
      )}
    </View>
  );
}
