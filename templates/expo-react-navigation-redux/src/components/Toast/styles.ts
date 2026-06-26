import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius, zIndex } from '../../theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.xxxl,
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    zIndex: zIndex.toast,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: spacing.xxs,
    elevation: 5,
  },
  message: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
});

export default styles;
