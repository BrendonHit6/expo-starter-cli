import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface IButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({ title, onPress, disabled = false }: IButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-primary py-3 px-6 rounded-lg items-center ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
