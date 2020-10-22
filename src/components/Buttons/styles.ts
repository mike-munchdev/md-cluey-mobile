import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSign: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  textView: {
    flex: 4,
  },
  textButtonView: { justifyContent: 'center', alignItems: 'center' },
  backContainer: {
    height: 60,
    width: 40,
    zIndex: 10,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
