import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white.hex,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    color: theme.dark.hex,
    fontWeight: 'bold',
    fontSize: 24,
  },
  subTitle: {
    color: colors.gray.normal,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 0,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  textSign: {
    color: colors.white.normal,
    fontWeight: 'bold',
  },
  parentCompaniesTextContainer: {
    flexDirection: 'column',
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  parentCompaniesCaptionText: {
    fontFamily: 'MontserratBold',
  },
  parentCompaniesText: {
    color: theme.dark.hex,
    fontFamily: 'MontserratMedium',
  },
});
