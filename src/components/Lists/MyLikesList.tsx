import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import theme from '../../constants/theme';
import { ICompanyReponse } from '../../interfaces';
import { MyLikesListItem } from '../ListItem';
import ListEmptyView from '../ListItem/ListEmptyView';

import styles from './styles';

export interface IMyLikesListProps {
  list: [];
  searchQuery: string;
  onChangeSearch:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  loading: boolean;
  handleRefresh?: (() => void) | undefined;
  refreshing: boolean;
}

const MyLikesList: FC<IMyLikesListProps> = ({
  list,
  loading,
  onChangeSearch,
  searchQuery,
  handleRefresh,
  refreshing,
}) => {
  const sortList = (list: ICompanyReponse[]) => {
    const orderedList = list.sort((a: ICompanyReponse, b: ICompanyReponse) => {
      return a.company.name > b.company.name;
    });

    return orderedList;
  };
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
            placeholder="Company"
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
            data={list ? sortList(list) : list}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <MyLikesListItem item={item} />;
            }}
            ListEmptyComponent={() => {
              return <ListEmptyView title="No Likes" />;
            }}
          />
        </Fragment>
      )}
    </View>
  );
};
export default MyLikesList;
