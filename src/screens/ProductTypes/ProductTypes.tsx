import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getProductTypesByCategoryCompleted,
  getProductTypesByCategoryError,
  GET_PRODUCT_TYPES_BY_CATEGORY,
} from '../../graphql/queries/productTypes/productTypes';
import { useLazyQuery } from '@apollo/react-hooks';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { ProductTypesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { PageHeaderText } from '../../components/Text';
import { NavHeader } from '../../components/Headers';

const ProductTypes: FC = () => {
  const route = useRoute();

  const [productTypes, setProductTypes] = useState(
    route.params.productTypes ? route.params.productTypes : []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [categoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );

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
    <StandardContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavHeader
          goBack
          title={route.params.productTypes ? 'Alternatives' : 'Subcategories'}
        />

        <ProductTypesList list={productTypes} loading={isLoading} />
      </View>
    </StandardContainer>
  );
};
export default ProductTypes;
