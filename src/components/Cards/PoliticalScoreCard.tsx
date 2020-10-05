import React, { useState, useEffect, FC, Fragment } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { ProgressBar, Colors, Button, List } from 'react-native-paper';
import { ICompany } from '../../interfaces';
import theme from '../../constants/theme';
import { Card, Icon } from 'react-native-elements';
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
  const updatePoliticalData = (company: ICompany | undefined) => {
    if (company?.parentCompanies) {
      const total = getPoliticalContributionsValue(company, 'total');
      
      const indivs = getPoliticalContributionsValue(company, 'indivs');
      
      const pacs = getPoliticalContributionsValue(company, 'pacs');
      
      const democrat = getPoliticalContributionsValue(company, 'democrats');
      
      const republican = getPoliticalContributionsValue(company, 'republicans');
      
      const thirdParty = getPoliticalContributionsValue(company, 'thirdParty');      

    }
  };
  
  useEffect(() => {
    updatePoliticalData(company);
  }, [company]);

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
            title="Individual"
            democrat={individualDemocratPercent}
            republican={individualRepublicanPercent}
          />
        </View>
        <View style={styles.politicalScoreContainer}>
          <ContributionsProgressBar
            title="PAC"
            democrat={pacDemocratPercent}
            republican={pacRepublicanPercent}
          />
        </View>
        <View style={styles.politicalSubTextContainer}>
          <View style={styles.politicalInfoView}>
            <View style={styles.politicalInfoTextView}>
              <Text style={styles.politicalInfoText}>
                of corporate PAC contributions support Republicans
              </Text>
            </View>
            <View style={styles.politicalInfoHelpView}>
              <FontAwesome5
                name="question-circle"
                size={16}
                color={theme.dark.hex}
              />
            </View>
          </View>
        </View>
      </List.Accordion>
    </Fragment>
  );
  // return (
  //   <View style={styles.politicalContainer}>
  //     <View style={{ flexDirection: 'row' }}>
  //       <Text style={styles.cardTitleText}>Political</Text>
  //       <View
  //         style={{
  //           marginLeft: 10,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         <FontAwesome5 name="flag-usa" size={24} color={theme.dark.hex} />
  //       </View>
  //     </View>
  //     <View style={styles.politicalScoreContainer}>
  //       <View
  //         style={{
  //           marginLeft: 10,
  //           width: '70%',
  //         }}
  //       >
  //         <ProgressBar
  //           progress={0.73}
  //           color={Colors.red800}
  //           style={{ height: 20 }}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'column',
  //           width: '30%',
  //           alignItems: 'center',
  //           justifyContent: 'flex-start',
  //         }}
  //       >
  //         <Text
  //           style={{
  //             fontFamily: 'CoinyRegular',
  //             fontSize: 36,
  //             fontWeight: 'bold',
  //             marginTop: -15,
  //           }}
  //         >
  //           73%
  //         </Text>
  //       </View>
  //     </View>
  //     <View style={styles.politicalSubTextContainer}>
  //       <View style={{ flexDirection: 'row' }}>
  //         <Text style={styles.politicalInfoText}>
  //           of corporate PAC contributions support Republicans
  //         </Text>
  //         <View style={{ justifyContent: 'center', marginLeft: 10 }}>
  //           <FontAwesome5
  //             name="question-circle"
  //             size={16}
  //             color={theme.dark.hex}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );
};
export default PoliticalScoreCard;
