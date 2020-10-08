import React, { useState, useEffect, FC, Fragment } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { ProgressBar, Colors, Button, List } from 'react-native-paper';
import { ICompany } from '../../interfaces';
import theme from '../../constants/theme';

export interface IPeopleScoreCardProps {
  company?: ICompany;
}

const PeopleScoreCard: FC<IPeopleScoreCardProps> = ({ company }) => {
  return (
    <Fragment>
      <List.Accordion
        title={
          <Fragment>
            <Text style={styles.cardTitleText}>People </Text>
            <FontAwesome5 name="users" size={24} color={theme.dark.hex} />
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
};
export default PeopleScoreCard;
