import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export default function LoginScreen() {
  const { login } = useAuth();
  const { isLoading, error } = useUserStore();

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
      <View className="flex-1 justify-center pb-8">
        <Text className="text-[28px] font-bold mb-8 text-text-primary">Sign In</Text>
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
        {!!error && <Text className="text-error text-sm mb-3">{error}</Text>}
        <View className="mt-2">
          <Button title={isLoading ? 'Signing in…' : 'Log In'} onPress={handleLogin} disabled={isLoading} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
