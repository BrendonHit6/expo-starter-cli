import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { colors } from '../../theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
