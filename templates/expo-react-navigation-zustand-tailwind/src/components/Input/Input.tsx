import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

interface IInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
}

export default function Input({
  value,
  onChangeText,
  label,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
}: IInputProps) {
  return (
    <View className="w-full mb-4">
      {!!label && <Text className="text-sm font-medium text-text-label mb-1.5">{label}</Text>}
      <TextInput
        className={`border rounded-lg py-3 px-4 text-base text-text-primary bg-background ${error ? 'border-error' : 'border-border'}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
      {!!error && <Text className="text-xs text-error mt-1">{error}</Text>}
    </View>
  );
}
