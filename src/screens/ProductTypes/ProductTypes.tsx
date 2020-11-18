import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getProductTypesByCategoryCompleted,
  getProductTypesByCategoryError,
  GET_PRODUCT_TYPES_BY_CATEGORY,
} from '../../graphql/queries/productTypes';
import { useLazyQuery } from '@apollo/react-hooks';
import { ProductTypesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import { AppContext } from '../../config/context';

const ProductTypes: FC = () => {
  const route = useRoute();

  const [productTypes, setProductTypes] = useState(
    route.params.company ? route.params.company.productTypes : []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [categoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );
  const { dispatch, state } = useContext(AppContext);
  const [getProductTypesByCategory] = useLazyQuery(
    GET_PRODUCT_TYPES_BY_CATEGORY,
    {
      fetchPolicy: 'network-only',
      onError: getProductTypesByCategoryError(
        setProductTypes,
        setIsLoading,
        dispatch,
        state.alertVisible
      ),
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
          title={
            route.params.company ? route.params.company.name : 'Subcategories'
          }
          subTitle={route.params.company ? 'Alternatives' : null}
        />

        <ProductTypesList list={productTypes} loading={isLoading} />
      </View>
    </StandardContainer>
  );
};
export default ProductTypes;
