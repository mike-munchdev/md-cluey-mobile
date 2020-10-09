import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 28,
    color: theme.dark.hex,
  },
});
