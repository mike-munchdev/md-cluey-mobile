import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ICompany } from '../../interfaces';
import styles from '../../screens/Splash/styles';

export interface IParentCompaniesTextProps {
  company: ICompany | undefined;
}

const ParentCompaniesText: FC<IParentCompaniesTextProps> = ({ company }) => {
  const [parentCompaniesText, setParentCompaniesText] = useState('');
  useEffect(() => {
    if (company && company.parentCompanies) {
      const pcText = company.parentCompanies.map((o) => `${o.name}`).join(', ');

      setParentCompaniesText(pcText);
    }
  }, [company]);
  return (
    <View style={styles.parentCompaniesTextContainer}>
      <Text style={styles.parentCompaniesText} numberOfLines={2}>
        <Text style={styles.parentCompaniesCaptionText}>
          Parent Companies:{' '}
        </Text>
        {parentCompaniesText}
      </Text>
    </View>
  );
};
export default ParentCompaniesText;
