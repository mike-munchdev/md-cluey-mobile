import React, { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IPageHeaderTextProps {
  title: string | JSX.Element;
  subTitle?: string;
}
const PageHeaderText: FC<IPageHeaderTextProps> = ({ title, subTitle }) => {
  return (
    <View style={styles.pageHeaderView}>
      {typeof title === 'string' ? (
        <Text style={styles.pageHeaderText}>{title}</Text>
      ) : (
        title
      )}
      {subTitle && <Text style={styles.pageSubtitleText}>{subTitle}</Text>}
    </View>
  );
};
export default PageHeaderText;
