import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.hex,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: theme.text,
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: theme.text,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    color: theme.text,
    backgroundColor: theme.white.hex,
    borderColor: theme.white.hex,
  },

  buttons: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    width: '100%',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotText: {},
  errorText: {
    color: colors.red.normal,
  },
});
