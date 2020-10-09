import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  politicalContainer: {
    height: 120,
  },

  politicalScoreContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  parentCompanyContainer: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCompanyCaptionText: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: theme.dark.hex,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleText: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: theme.dark.hex,
    paddingRight: 10,
  },
  cardTitleTextDisabled: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
    color: theme.light,
    paddingRight: 10,
  },
  peopleScoreCardContainer: {
    height: 120,
  },
  peopleSubTextContainer: {},
  impactScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.dark.hex,
    textTransform: 'capitalize',
  },
});
