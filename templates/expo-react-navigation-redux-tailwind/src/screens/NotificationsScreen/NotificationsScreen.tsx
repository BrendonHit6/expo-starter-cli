import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function NotificationsScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-2">Notifications</Text>
        <Text className="text-base text-text-muted">No new notifications</Text>
      </View>
    </ScreenWrapper>
  );
}
