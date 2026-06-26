import React from 'react';
import { View, Text, Image } from 'react-native';
import { getInitials } from './helper';
import styles from './styles';

interface IAvatarProps {
  name: string;
  uri?: string;
  size?: number;
}

export default function Avatar({ name, uri, size = 48 }: IAvatarProps) {
  const circleStyle = { width: size, height: size, borderRadius: size / 2 };
  const textFontSize = size * 0.38;

  return (
    <View style={[styles.circle, circleStyle]}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={[styles.initials, { fontSize: textFontSize }]}>{getInitials(name)}</Text>
      )}
    </View>
  );
}
