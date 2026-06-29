import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from './styles';

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
