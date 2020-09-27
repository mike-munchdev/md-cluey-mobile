import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
  },
  percentContainer: {
    width: '90%',
    flexDirection: 'row',
  },
  percentText: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.text,
  },
  republicanView: {
    backgroundColor: 'blue',
    height: 40,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  democratView: {
    backgroundColor: 'red',
    height: 40,

    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
