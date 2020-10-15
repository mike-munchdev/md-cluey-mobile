import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
const { height } = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleText: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontFamily: 'MontserratMedium',
    fontSize: height * 0.02,
    color: theme.dark.hex,
  },
  percentContainer: {
    width: '90%',
    flexDirection: 'row',
  },
  percentText: {
    fontSize: height * 0.02,
    fontWeight: '900',
    color: theme.text,
  },
  republicanView: {
    backgroundColor: 'red',
    height: 40,
    paddingRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  democratView: {
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
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
    fontSize: 12,
    color: theme.dark.hex,
  },
  politicalInfoHelpView: { justifyContent: 'center', marginRight: 5 },
});
