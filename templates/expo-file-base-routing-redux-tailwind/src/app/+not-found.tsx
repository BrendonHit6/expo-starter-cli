import React from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-base font-semibold text-text-primary mb-4">This screen doesn't exist.</Text>
        <Link href="/" className="mt-2">
          <Text className="text-sm text-primary">Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}
