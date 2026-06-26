import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});

export default styles;
