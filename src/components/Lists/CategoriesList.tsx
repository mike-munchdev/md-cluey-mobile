import Constants from 'expo-constants';
import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import theme from '../../constants/theme';
import { NODE_ENV } from '../../hooks/serverInfo';
import { NavListItem } from '../ListItem';

import styles from './styles';

export interface ICategoriesListProps {
  list: [];
  loading: boolean;
}

const CategoriesList: FC<ICategoriesListProps> = ({ list }) => {
  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        contentContainerStyle={{ width: '100%' }}
        style={{ width: '100%' }}
        data={list}
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
    </View>
  );
};
export default CategoriesList;
