import React, { useState, useEffect, FC, Fragment } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import theme from '../../constants/theme';
import { NavListItem } from '../ListItem';

import styles from './styles';
import { NODE_ENV } from '../../hooks/serverInfo';

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
  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator />
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
            data={list}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <NavListItem
                  rounded={false}
                  item={item}
                  routeName="Company"
                  params={{ company: item }}
                  title={item.name}
                  subTitle={item.brandUrl}
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
                    No companies
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
