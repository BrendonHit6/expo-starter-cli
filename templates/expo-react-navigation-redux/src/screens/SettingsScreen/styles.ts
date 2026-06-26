import { StyleSheet } from 'react-native';
import { fontSize, fontWeight, spacing } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  buttonWrapper: {
    width: '80%',
  },
});

export default styles;
