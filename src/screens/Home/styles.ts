import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../constants/theme';
const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  linksContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    flex: 1,
  },

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
    fontSize: height * 0.02,
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
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: height * 0.03,
    color: theme.dark.hex,
  },
  topViewContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  bottomViewContainer: {
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoText: {
    color: theme.dark.hex,
    fontFamily: 'CoinyRegular',
    fontSize: height * 0.08,
  },
  bottom: {
    position: 'absolute',
    bottom: -20,
    marginBottom: height > 800 ? -40 : -5,
  },
});
