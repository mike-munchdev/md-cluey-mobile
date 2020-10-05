import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  brandContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: 10,
    // marginTop: 50,
  },
  brandsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  infoContainer: {
    marginHorizontal: 10,
    height: '65%',
    flexDirection: 'column',
  },
  searchCaptionText: {
    fontSize: 26,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.dark.hex,
  },
  actionButtonContainer: {},
  companyNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 42,
    color: theme.dark.hex,
  },
});
