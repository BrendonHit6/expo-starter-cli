import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { hideToast } from '../../redux/slices/ToastSlice';
import { getToastBackground } from './helper';
import styles from './styles';

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
    <Animated.View style={[styles.container, getToastBackground(type), { opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}
