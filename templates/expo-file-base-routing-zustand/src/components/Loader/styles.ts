import { StyleSheet } from 'react-native';
import { colors, zIndex } from '../../theme';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.loader,
  },
});

export default styles;
