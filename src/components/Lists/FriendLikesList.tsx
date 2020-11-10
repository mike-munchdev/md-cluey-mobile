import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { ICompanyReponse } from '../../interfaces';
import { FriendLikesListItem } from '../ListItem';
import ListEmptyView from '../ListItem/ListEmptyView';

import styles from './styles';

export interface IFriendLikesListProps {
  list: ICompanyReponse[] | undefined;

  loading: boolean;
}

const FriendLikesList: FC<IFriendLikesListProps> = ({ list, loading }) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    if (list) {
      const orderedList = list.sort(
        (a: ICompanyReponse, b: ICompanyReponse) => {
          return a.company.name > b.company.name;
        }
      );
      setOrderedList(orderedList);
    }
  }, [list]);
  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <Fragment>
          <FlatList
            style={{ width: '100%' }}
            data={orderedList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <FriendLikesListItem item={item} title={item.name} />;
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
export default FriendLikesList;
