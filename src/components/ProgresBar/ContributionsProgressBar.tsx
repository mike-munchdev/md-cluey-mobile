import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import theme from '../../constants/theme';

export interface IContributionProgrsessBarProps {
  title: string;
  captionText: string;
  democrat: number;
  republican: number;
}
const ContributionsProgressBar: FC<IContributionProgrsessBarProps> = ({
  title,
  democrat,
  republican,
  captionText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.percentContainer}>
        <View
          style={{ ...styles.democratView, width: `${Math.floor(democrat)}%` }}
        >
          <Text
            style={styles.percentText}
            adjustsFontSizeToFit
          >{`${democrat}% (D)`}</Text>
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
          >{`${republican}% (R)`}</Text>
        </View>
      </View>
      <View style={styles.politicalSubTextContainer}>
        <View style={styles.politicalInfoView}>
          <View style={styles.politicalInfoTextView}>
            <Text style={styles.politicalInfoText}>{captionText}</Text>
          </View>
          {/* <View style={styles.politicalInfoHelpView}>
            <FontAwesome5
              name="question-circle"
              size={16}
              color={theme.dark.hex}
            />
          </View> */}
        </View>
      </View>
    </View>
  );
};
export default ContributionsProgressBar;
