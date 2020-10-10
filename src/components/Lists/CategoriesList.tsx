import Constants from 'expo-constants';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { NODE_ENV } from '../../hooks/serverInfo';
import { ICategory } from '../../interfaces';
import { NavListItem } from '../ListItem';

import styles from './styles';

export interface ICategoriesListProps {
  list: ICategory[];
  loading: boolean;
}

const CategoriesList: FC<ICategoriesListProps> = ({ list, loading }) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const orderedList = list.sort((a: ICategory, b: ICategory) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;

      if (a.isActive > b.isActive) return 1;
      if (a.isActive < b.isActive) return -1;

      return 0;
    });

    setOrderedList(orderedList);
  }, [list]);

  return (
    <View style={styles.categoriesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <FlatList
          contentContainerStyle={{ width: '100%' }}
          style={{ width: '100%' }}
          data={orderedList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <NavListItem
                rounded={true}
                item={item}
                routeName="ProductTypes"
                params={{ categoryId: item.id }}
                title={item.name}
                showLogo={true}
                logoUrl={
                  item.logoUrl
                    ? `${
                        Constants.manifest.extra.appVariables[String(NODE_ENV)]
                          .categoryImageUrlPrefix
                      }${item.logoUrl}`
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
                  No categories
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};
export default CategoriesList;
