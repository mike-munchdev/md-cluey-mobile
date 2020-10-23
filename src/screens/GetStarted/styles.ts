import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: theme.dark.rgba(0.4),
  },
  top: { height: '50%', justifyContent: 'center', alignItems: 'center' },
  sloganContainer: {
    height: '10%',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 16,
  },
  buttonContainer: {
    marginHorizontal: 10,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.buttonTransparentBackground,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  getStarted: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.buttonBackground,
    borderColor: theme.buttonBorder,
    borderWidth: 1,
  },
  skipText: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.charcoal,
    fontSize: 16,
  },
});
