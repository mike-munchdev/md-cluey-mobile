import { StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default StyleSheet.create({
  politicalContainer: {
    height: 120,
  },
  politicalInfoText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: theme.dark.hex,
  },
  politicalScoreContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  politicalSubTextContainer: {
    alignItems: 'center',
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
