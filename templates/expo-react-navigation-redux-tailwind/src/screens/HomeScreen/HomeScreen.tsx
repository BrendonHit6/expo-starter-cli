import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function HomeScreen() {
  const { logout } = useAuth();
  const user = useAppSelector(state => state.user.user);

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={80} />
        <Text className="text-2xl font-bold mt-4 mb-1">Welcome{user?.name ? `, ${user.name}` : ''}!</Text>
        {user?.email && <Text className="text-base text-text-secondary mb-8">{user.email}</Text>}
        <View className="mt-4 w-4/5">
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
