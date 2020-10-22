import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  brandContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: 10,
    // marginTop: 50,
  },
  barsContainer: {
    height: 60,
    width: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightIconContainer: {
    height: 60,
    width: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: 65,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.transparent,
  },
  title: { color: theme.dark.hex, fontWeight: 'bold', fontSize: 25 },
  rightIcon: {},
  leftIcon: {},
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterTitle: {
    color: theme.dark.hex,
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatListHeaderContainer: {
    backgroundColor: theme.dark.hex,
    marginBottom: 5,
    height: 25,
    justifyContent: 'center',
  },
  flatListHeaderText: {
    color: theme.white.hex,
    fontFamily: 'MontserratBold',
    fontSize: 16,
    marginLeft: 5,
  },
});
