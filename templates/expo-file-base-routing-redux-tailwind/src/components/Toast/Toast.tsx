import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { hideToast } from '../../redux/slices/ToastSlice';
import { getToastClassName } from './helper';

const DURATION = 3000;

export default function Toast() {
  const dispatch = useAppDispatch();
  const { visible, message, type } = useSelector((state: RootState) => state.toast);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        dispatch(hideToast());
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
