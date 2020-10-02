import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  likesContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
  },
  likesButton: { flexDirection: 'row', alignItems: 'center' },
  likesInfoText: {
    marginLeft: 10,
    fontFamily: 'MontserratMedium',
    fontSize: 14,
  },
});
