import React, { FC, Fragment } from 'react';
import { View, FlatList } from 'react-native';

import styles from './styles';
import { Chip } from 'react-native-paper';
import theme from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ICompany } from '../../interfaces';

export interface IParentCompaniesListProps {
  company?: ICompany;
  setCompany: Function;
}

const numColumns = 2;
const ParentCompaniesList: FC<IParentCompaniesListProps> = ({
  company,
  setCompany,
}) => {
  if (!company) return <Fragment />;
  if (!company.parentCompanies || company.parentCompanies.length === 0)
    return <Fragment />;

  return (
    <View style={styles.container}>
      <FlatList
        data={company.parentCompanies}
        numColumns={numColumns}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          // flexWrap: 'wrap',
        }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ marginBottom: 10 }}
              onPress={() => {
                setCompany(item);
              }}
            >
              <Chip
                style={{
                  backgroundColor: theme.facebookBlue,
                  height: 30,
                  marginLeft: 5,
                }}
                textStyle={{
                  color: theme.text,

                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 2,
                }}
              >
                {item.name}
              </Chip>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default ParentCompaniesList;
