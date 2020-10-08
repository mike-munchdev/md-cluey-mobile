import React, { FC, Fragment } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import theme from '../../constants/theme';
import { NavListItem } from '../ListItem';

import styles from './styles';

export interface IProductTypesListProps {
  list: [];

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
                <NavListItem
                  item={item}
                  routeName="Companies"
                  params={{ category: item }}
                  title={item.name}
                  showLogo={false}
                  logoUrl=""
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
                    No Subcategories
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
