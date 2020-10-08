import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: { width: '90%' },
  titleText: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    backgroundColor: 'red',
    height: 40,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  democratView: {
    backgroundColor: 'blue',
    height: 40,

    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  politicalSubTextContainer: {
    alignItems: 'center',
    width: '100%',
  },
  politicalInfoView: { flexDirection: 'row', width: '90%', marginTop: 10 },
  politicalInfoTextView: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  politicalInfoText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: theme.dark.hex,
  },
  politicalInfoHelpView: { justifyContent: 'center', marginRight: 5 },
});
