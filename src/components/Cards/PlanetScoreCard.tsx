import React, { FC, Fragment } from 'react';
import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import { List } from 'react-native-paper';
import { ICompany } from '../../interfaces';
import theme from '../../constants/theme';
export interface IPlanetScoreCardProps {
  company?: ICompany;
}

const PlanetScoreCard: FC<IPlanetScoreCardProps> = ({}) => {
  return (
    <List.Section
      title={
        <Fragment>
          <Text style={styles.cardTitleTextDisabled}>Planet </Text>
          <FontAwesome5
            name="globe-americas"
            size={24}
            color={theme.disabled.hex}
          />
          <Text style={styles.impactScoreTextDisabled}>
            {' '}
            [Impact Score Coming Soon!]
          </Text>
        </Fragment>
      }
    />
  );
};
export default PlanetScoreCard;
