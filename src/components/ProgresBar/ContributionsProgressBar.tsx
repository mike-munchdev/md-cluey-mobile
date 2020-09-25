import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IContributionProgressBarProps {
  democrat: number;
  republican: number;
}
const ContributionProgressBar: FC<IContributionProgressBarProps> = ({
  democrat,
  republican,
}) => {
  return (
    <View style={styles.container}>
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
  );
};
export default ContributionProgressBar;
