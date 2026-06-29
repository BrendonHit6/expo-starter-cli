import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

interface ILoaderProps {
  visible: boolean;
  color?: string;
}

export default function Loader({ visible, color = '#fff' }: ILoaderProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}
