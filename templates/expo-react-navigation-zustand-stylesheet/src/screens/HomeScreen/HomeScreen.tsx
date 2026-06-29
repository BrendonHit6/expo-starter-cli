import React from 'react';
import { View, Text } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from './styles';

export default function HomeScreen() {
  const { logout } = useAuth();
  const user = useUserStore(state => state.user);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={80} />
        <Text style={styles.title}>Welcome{user?.name ? `, ${user.name}` : ''}!</Text>
        {user?.email && <Text style={styles.email}>{user.email}</Text>}
        <View style={styles.buttonWrapper}>
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
