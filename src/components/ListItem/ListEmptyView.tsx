import React, { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IListEmptyView {
  title: string;
}
const ListEmptyView: FC<IListEmptyView> = ({ title }) => {
  return (
    <View style={styles.listEmptyView}>
      <Text style={styles.listEmptyText}>{title}</Text>
    </View>
  );
};
export default ListEmptyView;
