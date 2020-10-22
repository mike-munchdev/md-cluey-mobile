import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  likesContainer: {
    // position: 'absolute',
    // bottom: 60,
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
  buttonText: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
    color: theme.dark.hex,
  },
  iconView: {
    width: 64,
    height: 64,
    backgroundColor: theme.white.hex,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.dark.hex,
    borderWidth: 2,
  },
  buttonView: { justifyContent: 'center', alignItems: 'center' },
  toolTipContainer: { backgroundColor: theme.white.hex },
});
