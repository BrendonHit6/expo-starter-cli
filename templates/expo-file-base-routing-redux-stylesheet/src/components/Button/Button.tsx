import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface IButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({ title, onPress, disabled = false }: IButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}
