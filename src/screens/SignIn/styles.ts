import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: theme.dark.rgba(0.4),
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  formContainer: {
    marginHorizontal: 10,
    flex: 4,
    flexDirection: 'column',
  },
  inputView: {
    height: 300,
    justifyContent: 'flex-start',
    // backgroundColor: 'blue',
  },
  buttonsView: {
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});
