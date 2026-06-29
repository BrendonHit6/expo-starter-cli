import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Avatar from '../../components/Avatar';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from './styles';

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Avatar name={user?.name ?? 'U'} uri={user?.avatar} size={90} />
        <Text style={styles.name}>{user?.name ?? '—'}</Text>
        <Text style={styles.email}>{user?.email ?? '—'}</Text>
      </View>
    </ScreenWrapper>
  );
}
