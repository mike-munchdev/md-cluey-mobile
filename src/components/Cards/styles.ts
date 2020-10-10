import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
const { height } = Dimensions.get('screen');

const titleText = {
  fontFamily: 'MontserratBold',
  fontSize: height * 0.03,
  color: theme.dark.hex,
  paddingRight: 10,
};
const disabledText = {
  fontFamily: 'MontserratBold',
  fontSize: height * 0.03,
  color: theme.disabled.hex,
  paddingRight: 10,
};
export default StyleSheet.create({
  politicalContainer: {
    // height: 120,
  },

  politicalScoreContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  parentCompanyContainer: {
    // height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentCompanyCaptionText: {
    fontFamily: 'Montserrat',
    fontSize: height * 0.03,
    color: theme.dark.hex,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleText: titleText,
  cardTitleTextDisabled: disabledText,
  peopleScoreCardContainer: {
    // height: 120,
  },
  peopleSubTextContainer: {},
  impactScoreText: {
    ...disabledText,
    fontSize: 11,
  },
  impactScoreTextDisabled: {
    ...disabledText,
    fontSize: 11,
  },
});
