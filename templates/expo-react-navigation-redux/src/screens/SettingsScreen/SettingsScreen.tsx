import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from './styles';

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Log Out" onPress={logout} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
