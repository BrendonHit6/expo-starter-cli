import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useToastStore } from '../../store/toastStore';
import { getToastClassName } from './helper';

const DURATION = 3000;

export default function Toast() {
  const visible = useToastStore(state => state.visible);
  const message = useToastStore(state => state.message);
  const type = useToastStore(state => state.type);
  const hideToast = useToastStore(state => state.hideToast);
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
    <Animated.View
      className={`absolute top-14 left-4 right-4 rounded-[10px] py-3 px-4 z-[1000] shadow-lg ${getToastClassName(type)}`}
      style={{ opacity }}
    >
      <Text className="text-white text-sm font-medium">{message}</Text>
    </Animated.View>
  );
}
