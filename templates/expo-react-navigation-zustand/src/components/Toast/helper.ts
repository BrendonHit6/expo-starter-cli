import { ViewStyle } from 'react-native';
import { colors } from '../../theme';

const BACKGROUND: Record<'success' | 'error' | 'info', string> = {
  success: colors.success,
  error: colors.error,
  info: colors.primary,
};

export const getToastBackground = (type: 'success' | 'error' | 'info'): ViewStyle => ({
  backgroundColor: BACKGROUND[type],
});
