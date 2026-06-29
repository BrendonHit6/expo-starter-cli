import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={90} />
        <Text className="text-2xl font-bold mt-4 mb-1">{user?.name ?? '—'}</Text>
        <Text className="text-base text-text-secondary">{user?.email ?? '—'}</Text>
      </View>
    </ScreenWrapper>
  );
}
