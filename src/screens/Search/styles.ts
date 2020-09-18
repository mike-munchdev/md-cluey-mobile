import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  top: {
    height: 75,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    bottom: 10,
  },
});
