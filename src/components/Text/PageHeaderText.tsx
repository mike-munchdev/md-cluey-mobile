import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IPageHeaderTextProps {
  title: string;
  subTitle?: string;
}
const PageHeaderText: FC<IPageHeaderTextProps> = ({ title, subTitle }) => {
  return (
    <View style={styles.pageHeaderView}>
      <Text style={styles.pageHeaderText}>{title}</Text>
      {subTitle && <Text style={styles.pageSubtitleText}>{subTitle}</Text>}
    </View>
  );
};
export default PageHeaderText;
