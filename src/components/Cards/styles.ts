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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  politicalSubTextContainer: {
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
  politicalInfoView: { flexDirection: 'row', width: '90%', marginTop: 10 },
  politicalInfoHelpView: { justifyContent: 'center', marginRight: 5 },
  politicalInfoTextView: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
