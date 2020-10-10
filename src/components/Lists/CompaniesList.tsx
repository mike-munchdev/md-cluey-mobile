import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import theme from '../../constants/theme';
import { NavListItem } from '../ListItem';

import styles from './styles';
import { NODE_ENV } from '../../hooks/serverInfo';
import { ICompany } from '../../interfaces';

export interface ICompaniesListProps {
  list: [];
  searchQuery: string;
  onChangeSearch:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  loading: boolean;
}
const CompaniesList: FC<ICompaniesListProps> = ({
  list,
  searchQuery,
  onChangeSearch,
  loading,
}) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const orderedList = list.sort((a: ICompany, b: ICompany) => {
      return a.name > b.name;
    });
    // .sort((a: ICompany, b: ICompany) => {
    //   return !a.isActive;
    // });

    setOrderedList(orderedList);
  }, [list]);

  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <Fragment>
          <Searchbar
            style={{ marginBottom: 10 }}
            placeholder="Name"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <FlatList
            style={{ width: '100%' }}
            data={orderedList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <NavListItem
                  rounded={false}
                  item={item}
                  routeName="Company"
                  params={{ company: item }}
                  title={item.name}
                  showLogo={true}
                  logoUrl={
                    item.brandLogoUrl
                      ? `${
                          Constants.manifest.extra.appVariables[
                            String(NODE_ENV)
                          ].brandLogoUrlPrefix
                        }${item.brandLogoUrl}`
                      : ''
                  }
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: 'MontserratMedium',
                      fontSize: 24,
                      color: theme.dark.hex,
                    }}
                  >
                    No Brands
                  </Text>
                </View>
              );
            }}
          />
        </Fragment>
      )}
    </View>
  );
};
export default CompaniesList;
