import React, { useState, useEffect, Fragment, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface IContributionTitleProps {
  title: string;
  total: number;
}
const ContributionTitle: FC<IContributionTitleProps> = ({ title, total }) => {
  return (
    <Fragment>
      <Text>
        <Text style={{ fontFamily: 'Montserrat', fontSize: 16 }}>{title}</Text>
        {total ? (
          <Text>{`: $${new Intl.NumberFormat().format(total)}`}</Text>
        ) : null}
      </Text>
    </Fragment>
  );
};
export default ContributionTitle;
