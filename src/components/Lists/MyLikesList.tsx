import React, { useState, useEffect, FC, Fragment } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import theme from '../../constants/theme';
import { MyLikesListItem, NavListItem } from '../ListItem';

import styles from './styles';

export interface IMyLikesListProps {
  list: [];
  searchQuery: string;
  onChangeSearch:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  loading: boolean;
}

const MyLikesList: FC<IMyLikesListProps> = ({
  list,
  loading,
  onChangeSearch,
  searchQuery,
}) => {
  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <Fragment>
          <Searchbar
            style={{ marginBottom: 10 }}
            placeholder="Company"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <FlatList
            style={{ width: '100%' }}
            data={list}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return <MyLikesListItem item={item} title={item.company.name} />;
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
                    No Likes
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
export default MyLikesList;
