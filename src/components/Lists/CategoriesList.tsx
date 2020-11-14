import Constants from 'expo-constants';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { NODE_ENV } from '../../hooks/serverInfo';
import { ICategory } from '../../interfaces';
import { NavListItem } from '../ListItem';
import ListEmptyView from '../ListItem/ListEmptyView';

import styles from './styles';

export interface ICategoriesListProps {
  list: ICategory[];
  loading: boolean;
}

const CategoriesList: FC<ICategoriesListProps> = ({ list, loading }) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const activeRecords = list.filter((l) => l.isActive === true);
    const inActiveRecords = list.filter((l) => l.isActive !== true);
    const activeListOrdered = activeRecords.sort(
      (a: ICategory, b: ICategory) => {
        return a.name > b.name;
      }
    );
    const inactiveListOrdered = inActiveRecords.sort(
      (a: ICategory, b: ICategory) => {
        return a.name > b.name;
      }
    );

    setOrderedList([...activeListOrdered, ...inactiveListOrdered]);
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
            return <ListEmptyView title="No Categories" />;
          }}
        />
      )}
    </View>
  );
};
export default CategoriesList;
