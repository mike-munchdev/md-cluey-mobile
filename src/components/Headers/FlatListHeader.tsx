import React, { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IFlatListHeaderProps {
  title: string;
}
const FlatListHeader: FC<IFlatListHeaderProps> = ({ title }) => {
  return (
    <View style={styles.flatListHeaderContainer}>
      <Text style={styles.flatListHeaderText}>{title}</Text>
    </View>
  );
};
export default FlatListHeader;
