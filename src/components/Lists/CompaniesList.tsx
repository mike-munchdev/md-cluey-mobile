import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import theme from '../../constants/theme';
import { NavListItem } from '../ListItem';

import styles from './styles';
import { NODE_ENV } from '../../hooks/serverInfo';
import { ICompany } from '../../interfaces';
import ListEmptyView from '../ListItem/ListEmptyView';

export interface ICompaniesListProps {
  list: [];
  searchQuery: string;
  onChangeSearch:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  loading: boolean;
  handleRefresh?: (() => void) | undefined;
  refreshing: boolean;
}
const CompaniesList: FC<ICompaniesListProps> = ({
  list,
  searchQuery,
  onChangeSearch,
  loading,
  handleRefresh,
  refreshing,
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
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="off"
            style={{ marginBottom: 10 }}
            placeholder="Company Name"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
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
              return <ListEmptyView title="No Brands" />;
            }}
          />
        </Fragment>
      )}
    </View>
  );
};
export default CompaniesList;
