import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import theme from '../../constants/theme';
import { ICompanyReponse } from '../../interfaces';
import { MyLikesListItem } from '../ListItem';

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
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const orderedList = list.sort((a: ICompanyReponse, b: ICompanyReponse) => {
      return a.company.name > b.company.name;
    });

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
            placeholder="Company"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <FlatList
            style={{ width: '100%' }}
            data={orderedList}
            keyExtractor={(item) => item.id.toString()}
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
