import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IContributionProgressBarProps {
  title: string;
  democrat: number;
  republican: number;
}
const ContributionProgressBar: FC<IContributionProgressBarProps> = ({
  title,
  democrat,
  republican,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.percentContainer}>
        <View
          style={{ ...styles.democratView, width: `${Math.floor(democrat)}%` }}
        >
          <Text
            style={styles.percentText}
            adjustsFontSizeToFit
          >{`${democrat}%`}</Text>
        </View>
        <View
          style={{
            ...styles.republicanView,
            width: `${Math.floor(republican)}%`,
          }}
        >
          <Text
            style={styles.percentText}
            adjustsFontSizeToFit
          >{`${republican}%`}</Text>
        </View>
      </View>
    </View>
  );
};
export default ContributionProgressBar;
