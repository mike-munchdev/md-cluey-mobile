import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { IProductType } from '../../interfaces';
import { NavListItem } from '../ListItem';

import styles from './styles';

export interface IProductTypesListProps {
  list: IProductType[];

  loading: boolean;
}
const ProductTypesList: FC<IProductTypesListProps> = ({ list, loading }) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const orderedList = list.sort((a: IProductType, b: IProductType) => {
      return a.name > b.name;
    });
    // .sort((a: IProductType, b: IProductType) => {
    //   return !a.isActive;
    // });

    setOrderedList(orderedList);
  }, [list]);
  return (
    <View style={styles.productTypesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <Fragment>
          <FlatList
            contentContainerStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            data={orderedList}
            keyExtractor={(item) => item.id.toString()}
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
