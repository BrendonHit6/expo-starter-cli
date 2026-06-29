import { StyleSheet } from 'react-native';
import { colors, fontWeight } from '../../theme';

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    color: colors.white,
    fontWeight: fontWeight.semibold,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
