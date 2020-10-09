import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
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
