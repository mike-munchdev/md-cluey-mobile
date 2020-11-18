import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyView: { alignItems: 'center', marginBottom: 30 },
  listEmptyText: {
    fontFamily: 'MontserratMedium',
    fontSize: 24,
    color: theme.dark.hex,
  },
});
