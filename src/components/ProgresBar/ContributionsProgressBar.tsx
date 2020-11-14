import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import theme from '../../constants/theme';
import { Tooltip } from 'react-native-elements';

export interface IContributionProgrsessBarProps {
  title: React.ReactNode;
  toolTipPopover: React.ReactElement<{}>;
  democrat: number;
  republican: number;
  tooltipHeight?: number | undefined;
}
const ContributionsProgressBar: FC<IContributionProgrsessBarProps> = ({
  title,
  democrat,
  republican,
  toolTipPopover,
  tooltipHeight,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {title}
        <Tooltip
          width={300}
          height={tooltipHeight || 150}
          containerStyle={{ backgroundColor: theme.white.hex }}
          popover={toolTipPopover}
          backgroundColor={theme.white.hex}
        >
          <FontAwesome5
            name="question-circle"
            size={18}
            color={theme.dark.hex}
          />
        </Tooltip>
      </View>
      <View style={styles.percentContainer}>
        {democrat >= 0 && republican >= 0 ? (
          <>
            <View
              style={{
                ...styles.democratView,
                width: `${Math.floor(democrat)}%`,
              }}
            >
              <Text
                style={styles.percentText}
                numberOfLines={1}
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
                numberOfLines={1}
              >{`${republican}% (R)`}</Text>
            </View>
          </>
        ) : (
          <Text style={{ color: theme.dark.hex }}>No contributions found</Text>
        )}
      </View>
      {/* <View style={styles.politicalSubTextContainer}>
        <View style={styles.politicalInfoView}>
          <View style={styles.politicalInfoTextView}>
            <Text style={styles.politicalInfoText}>{captionText}</Text>
          </View>
          <View style={styles.politicalInfoHelpView}>
            <FontAwesome5
              name="question-circle"
              size={16}
              color={theme.dark.hex}
            />
          </View>
        </View>
      </View> */}
    </View>
  );
};
export default ContributionsProgressBar;
