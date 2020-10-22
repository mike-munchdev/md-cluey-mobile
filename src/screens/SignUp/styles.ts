import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  top: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  formContainer: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
  },
  inputView: {
    height: 380,
    justifyContent: 'flex-start',
  },
  buttonsView: {
    marginTop: 10,
    height: 200,
    justifyContent: 'flex-start',
  },
});
