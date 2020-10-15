import React, { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { ParentCompaniesList } from '../Lists';
import { ICompany } from '../../interfaces';

export interface IParentOrganizationCardProps {
  company?: ICompany;
  setCompany: Function;
}

const ParentOrganizationCard: FC<IParentOrganizationCardProps> = ({
  company,
  setCompany,
}) => {
  if (
    !company ||
    !company.parentCompanies ||
    company.parentCompanies.length === 0
  )
    return null;
  return (
    <View style={styles.parentCompanyContainer}>
      <Text style={styles.parentCompanyCaptionText}>
        Parent Organization(s):
      </Text>
      <View style={styles.chipsContainer}>
        <ParentCompaniesList company={company} setCompany={setCompany} />
      </View>
    </View>
  );
};
export default ParentOrganizationCard;
