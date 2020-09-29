import React, { useState, useEffect, FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import theme from '../../constants/theme';
import { NavListItem } from '../ListItem';

import styles from './styles';

export interface ICategoriesListProps {
  list: [];
  loading: boolean;
}

const CategoriesList: FC<ICategoriesListProps> = ({ list, loading }) => {
  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        contentContainerStyle={{ width: '100%' }}
        style={{ width: '100%' }}
        data={list}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <NavListItem
              item={item}
              routeName="ProductTypes"
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
                No categories
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default CategoriesList;
