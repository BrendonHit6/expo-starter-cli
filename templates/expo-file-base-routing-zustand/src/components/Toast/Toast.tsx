import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useToastStore } from '../../store/toastStore';
import { getToastBackground } from './helper';
import styles from './styles';

const DURATION = 3000;

export default function Toast() {
  const { visible, message, type, hideToast } = useToastStore();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        hideToast();
      });
    }, DURATION);

    return () => clearTimeout(timer);
  }, [visible, message]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, getToastBackground(type), { opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}
