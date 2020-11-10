import React, { useState, useEffect, FC, Fragment } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { List } from 'react-native-paper';
import { ICompany, IPoliticalContribution } from '../../interfaces';
import theme from '../../constants/theme';
import { ContributionsProgressBar } from '../ProgresBar';
import ContributionTitle from './ContributionTitle';
export interface IPoliticalScoreCardProps {
  company?: ICompany;
}

const PoliticalScoreCard: FC<IPoliticalScoreCardProps> = ({ company }) => {
  const [expanded, setExpanded] = useState(true);
  const [individualDemocratPercent, setIndividualDemocratPercent] = useState(0);
  const [
    individualRepublicanPercent,
    setIndividualRepublicanPercent,
  ] = useState(0);
  const [individualTotal, setIndividualTotal] = useState(0);

  const [pacDemocratPercent, setPacDemocratPercent] = useState(0);
  const [pacRepublicanPercent, setPacRepublicanPercent] = useState(0);
  const [pacTotal, setPacTotal] = useState(0);

  const getPoliticalContributionsValue = (
    company: ICompany | undefined,
    property: string
  ): number => {
    return company
      ? company?.politicalContributions.reduce(
          (acc, curr: IPoliticalContribution) => {
            return acc + curr[property];
          },
          0
        )
      : 0;
  };

  useEffect(() => {
    if (company && company.politicalContributions) {
      const indivs = getPoliticalContributionsValue(company, 'indivs');
      const indivsDems = getPoliticalContributionsValue(company, 'indivs_dems');
      const indivsRepubs = getPoliticalContributionsValue(
        company,
        'indivs_repubs'
      );
      const pacs = getPoliticalContributionsValue(company, 'pacs');
      const pacsDems = getPoliticalContributionsValue(company, 'pacs_dems');
      const pacsRepubs = getPoliticalContributionsValue(company, 'pacs_repubs');

      setIndividualTotal(indivs);
      setIndividualDemocratPercent(Math.round((indivsDems / indivs) * 100));
      setIndividualRepublicanPercent(Math.round((indivsRepubs / indivs) * 100));

      setPacTotal(pacs);
      setPacDemocratPercent(Math.round((pacsDems / pacs) * 100));
      setPacRepublicanPercent(Math.round((pacsRepubs / pacs) * 100));
    }
  }, [company]);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Fragment>
      <List.Section
        onPress={handlePress}
        expanded={expanded}
        title={
          <Fragment>
            <Text style={styles.cardTitleText}>Political </Text>
            <FontAwesome5 name="flag-usa" size={24} color={theme.dark.hex} />
          </Fragment>
        }
      >
        <View style={styles.politicalScoreContainer}>
          <ContributionsProgressBar
            title={
              <ContributionTitle
                title="Individual Contributions"
                total={individualTotal}
              />
            }
            democrat={individualDemocratPercent}
            republican={individualRepublicanPercent}
            toolTipPopover={
              <View style={{ flex: 1 }}>
                <Text>
                  Individual contributions made by employees over the amount of
                  $1,000 to political candidates in the 2016, 2018, and 2020
                  federal election cycles. Typically, donations of this size are
                  made by high-level executives.
                </Text>
                <Text
                  style={{ marginTop: 10, fontSize: 12, fontWeight: 'bold' }}
                >
                  Data from the Center of Responsive Politics
                </Text>
              </View>
            }
            tooltipHeight={150}
          />
        </View>
        <View style={styles.politicalScoreContainer}>
          <ContributionsProgressBar
            title={
              <ContributionTitle title="PAC Contributions" total={pacTotal} />
            }
            democrat={pacDemocratPercent}
            republican={pacRepublicanPercent}
            toolTipPopover={
              <View style={{ flex: 1 }}>
                <Text>
                  Contributions made by Corporate PAC to political candidates in
                  the 2016, 2018, and 2020 federal election cycles.
                </Text>
                <Text
                  style={{ marginTop: 10, fontSize: 12, fontWeight: 'bold' }}
                >
                  Data from the Center of Responsive Politics
                </Text>
              </View>
            }
            tooltipHeight={100}
          />
        </View>
      </List.Section>
    </Fragment>
  );
};
export default PoliticalScoreCard;
