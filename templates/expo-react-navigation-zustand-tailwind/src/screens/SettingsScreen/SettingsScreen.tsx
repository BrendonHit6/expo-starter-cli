import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-6">Settings</Text>
        <View className="w-4/5">
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
