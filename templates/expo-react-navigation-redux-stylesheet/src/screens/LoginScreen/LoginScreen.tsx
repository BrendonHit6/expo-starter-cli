import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/store';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ScreenWrapper from '../../components/ScreenWrapper';
import { validateEmail, validatePassword } from './helper';
import styles from './styles';

export default function LoginScreen() {
  const { login } = useAuth();
  const { isLoading, error } = useAppSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setValidationError('Enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }
    setValidationError('');
    login({ email: email.trim(), password });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={validationError && !validateEmail(email) ? validationError : undefined}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          secureTextEntry
          error={validationError && !validatePassword(password) ? validationError : undefined}
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.buttonWrapper}>
          <Button title={isLoading ? 'Signing in…' : 'Log In'} onPress={handleLogin} disabled={isLoading} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
