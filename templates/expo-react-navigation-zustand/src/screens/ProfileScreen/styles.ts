import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.xxs,
  },
  email: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});

export default styles;
