import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  brandContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.1,
    marginHorizontal: 10,
    marginBottom: 30,
    // marginTop: 50,
  },
  infoContainer: {
    marginHorizontal: 10,
    height: height * 0.6,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  parentCompanyContainer: {
    marginHorizontal: 10,
    height: height * 0.05,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  actionButtonContainer: {
    height: height * 0.2,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  brandsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },

  searchCaptionText: {
    fontSize: 26,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.dark.hex,
  },

  contributionContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contributionText: {
    color: theme.dark.hex,
    fontWeight: 'bold',
  },
});
