import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  friendsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 10,
  },
  infoContainer: {
    marginHorizontal: 10,
    height: '75%',
    flexDirection: 'column',
  },
  searchCaptionText: {
    fontSize: 26,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.dark.hex,
  },
  actionButtonContainer: {},
});
