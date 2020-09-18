import React, { useState, useEffect, FC, Fragment } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { ProgressBar, Colors, Button, List } from 'react-native-paper';
import { ICompany } from '../../interfaces';
import theme from '../../constants/theme';
export interface IPlanetScoreCardProps {
  company?: ICompany;
}

const PlanetScoreCard: FC<IPlanetScoreCardProps> = ({ company }) => {
  return (
    <Fragment>
      <List.Accordion
        title={
          <Fragment>
            <Text style={styles.cardTitleText}>Planet </Text>
            <FontAwesome5
              name="globe-americas"
              size={24}
              color={theme.dark.hex}
            />
          </Fragment>
        }
      >
        <List.Item
          title="IMPACT SCORE: COMING SOON!"
          titleStyle={styles.impactScoreText}
        />
      </List.Accordion>
    </Fragment>
  );

  // return (
  //   <View style={styles.peopleScoreCardContainer}>
  //     <View style={{ flexDirection: 'row' }}>
  //       <Text style={styles.cardTitleText}>Planet</Text>
  //       <View
  //         style={{
  //           marginLeft: 10,
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         <FontAwesome5
  //           name="globe-americas"
  //           size={24}
  //           color={theme.dark.hex}
  //         />
  //       </View>
  //     </View>
  //     <View style={styles.peopleSubTextContainer}>
  //       <View style={{ flexDirection: 'row' }}>
  //         <View style={{ justifyContent: 'flex-start', marginLeft: 10 }}>
  //           <Text style={styles.impactScoreText}>IMPACT SCORE:</Text>
  //         </View>
  //         <View style={{ justifyContent: 'center', marginLeft: 10 }}>
  //           <Button
  //             color={theme.dark.hex}
  //             style={{ height: 50 }}
  //             contentStyle={{
  //               height: '100%',
  //             }}
  //             mode="contained"
  //             onPress={() => console.log('Pressed')}
  //           >
  //             <Text style={{ fontWeight: 'bold' }}>COMING SOON!</Text>
  //           </Button>
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );
};
export default PlanetScoreCard;
