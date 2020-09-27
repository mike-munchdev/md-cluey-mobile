import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import CategoriesContainer from './CategoriesContainer';
import styles from './styles';
import theme from '../../constants/theme';
import {
  getCategoriesCompleted,
  getCategoriesError,
  GET_CATEGORIES,
} from '../../graphql/queries/categories/categories';
import { useLazyQuery } from '@apollo/react-hooks';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { CategoriesList } from '../../components/Lists';

const Categories: FC = () => {
  const [] = useState('');

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    onError: getCategoriesError(setCategories, setIsLoading),
    onCompleted: getCategoriesCompleted(setCategories, setIsLoading),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getCategories();
    })();
  }, []);

  return (
    <CategoriesContainer>
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
              fontSize: 50,
              color: theme.dark.hex,
            }}
          >
            Categories
          </Text>
        </View>
        <CategoriesList list={categories} loading={isLoading} />
      </View>
    </CategoriesContainer>
  );
};
export default Categories;
