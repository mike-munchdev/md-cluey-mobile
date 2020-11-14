import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  friendsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  infoContainer: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  },
  searchCaptionText: {
    fontSize: 26,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: theme.dark.hex,
  },
  actionButtonContainer: {},
});
