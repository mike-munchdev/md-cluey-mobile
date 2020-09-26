import React, { FC, Fragment } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import theme from '../../constants/theme';
import { SimpleListItem } from '../ListItem';

import styles from './styles';

export interface IProductTypesListProps {
  list: [];
  searchQuery: string;
  onChangeSearch:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  loading: boolean;
}
const ProductTypesList: FC<IProductTypesListProps> = ({ list, loading }) => {
  return (
    <View style={styles.productTypesContainer}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Fragment>
          <FlatList
            contentContainerStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            data={list}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <SimpleListItem
                  item={item}
                  routeName="Companies"
                  params={{ categoryId: item.id }}
                  title={item.name}
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
                    No Product Types
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
export default ProductTypesList;
