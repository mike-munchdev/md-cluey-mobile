import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeaderView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  pageHeaderText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    color: theme.dark.hex,
    marginBottom: 10,
  },
  pageSubtitleText: {
    fontFamily: 'MontserratMedium',
    fontSize: 12,
    color: theme.dark.hex,
    // marginTop: -25,
    marginBottom: 10,
  },
  logoText: {
    color: theme.dark.hex,
    fontFamily: 'CoinyRegular',
    fontSize: height * 0.08,
  },
});
