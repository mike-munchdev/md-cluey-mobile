import React, { useState, useEffect, FC, Fragment } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { List } from 'react-native-paper';
import { ICompany } from '../../interfaces';
import theme from '../../constants/theme';
import { ContributionsProgressBar } from '../ProgresBar';
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
  const [pacDemocratPercent, setPacDemocratPercent] = useState(0);
  const [pacRepublicanPercent, setPacRepublicanPercent] = useState(0);

  const getPoliticalContributionsValue = (company: ICompany | undefined, property: string) : number => {
    return company ? company?.parentCompanies.reduce((acc, curr) => {
      return (
        curr.politicalContributions?.reduce((p, c) => {
          return p + c.[property];
        }, 0) + acc
      );
    }, 0) : 0;
  }
  useEffect(() => {
    const iRepublican = Math.floor(Math.random() * 100);
    const iDemocrat = 100 - iRepublican;
    const pRepublican = Math.floor(Math.random() * 100);
    const pDemocrat = 100 - pRepublican;
    setIndividualDemocratPercent(iDemocrat);
    setIndividualRepublicanPercent(iRepublican);
    setPacDemocratPercent(pDemocrat);
    setPacRepublicanPercent(pRepublican);
  }, [company]);
  
  // useEffect(() => {
  //   updatePoliticalData(company);
  // }, [company]);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Fragment>
      <List.Accordion
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
            title="Individual Contributions"
            democrat={individualDemocratPercent}
            republican={individualRepublicanPercent}
            tooltipText={`Individual contributions made by employees over the amount of $1,000 to political candidates in the 2016, 2018, and 2020 federal election cycles.. Typically, donations of this size are made by high-level executives. Contributions made in the 2016, 2018, and 2020 federal election cycles.`}
            tooltipHeight={170}
          />
        </View>
        <View style={styles.politicalScoreContainer}>
          <ContributionsProgressBar
            title="PAC Contributions"
            democrat={pacDemocratPercent}
            republican={pacRepublicanPercent}
            tooltipText={`Contributions made by Corporate PAC to political candidates in the 2016, 2018, and 2020 federal election cycles.\n\n\nData from the Center of Responsive Politics.`}
            tooltipHeight={150}
          />
        </View>  
        
         
        
      </List.Accordion>
    </Fragment>
  );
 
};
export default PoliticalScoreCard;
