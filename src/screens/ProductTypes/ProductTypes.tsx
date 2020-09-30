import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

import ProductTypesContainer from './ProductTypesContainer';
import styles from './styles';
import theme from '../../constants/theme';
import {
  getProductTypesByCategoryCompleted,
  getProductTypesByCategoryError,
  GET_PRODUCT_TYPES_BY_CATEGORY,
} from '../../graphql/queries/productTypes/productTypes';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { RoundedIconButton } from '../../components/Buttons';
import { NavListItem } from '../../components/ListItem';
import { ProductTypesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';

const ProductTypes: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [productTypes, setProductTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );

  const navigation = useNavigation();
  const [getProductTypesByCategory] = useLazyQuery(
    GET_PRODUCT_TYPES_BY_CATEGORY,
    {
      fetchPolicy: 'network-only',
      onError: getProductTypesByCategoryError(setProductTypes, setIsLoading),
      onCompleted: getProductTypesByCategoryCompleted(
        setProductTypes,
        setIsLoading
      ),
    }
  );

  useEffect(() => {
    (async () => {
      if (categoryId) {
        await getProductTypesByCategory({
          variables: {
            id: categoryId,
          },
        });
      }
    })();
  }, [categoryId]);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavigationHeader goBack />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'CoinyRegular',
              fontSize: 48,
              color: theme.dark.hex,
            }}
          >
            Subcategories
          </Text>
        </View>
        <ProductTypesList list={productTypes} loading={isLoading} />
      </View>
    </StandardContainer>
  );
};
export default ProductTypes;
