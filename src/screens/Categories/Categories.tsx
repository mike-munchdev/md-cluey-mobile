import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import {
  getCategoriesCompleted,
  getCategoriesError,
  GET_CATEGORIES,
} from '../../graphql/queries/categories/categories';
import { useLazyQuery } from '@apollo/react-hooks';

import { CategoriesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { PageHeaderText } from '../../components/Text';
import { NavHeader } from '../../components/Headers';

const Categories: FC = () => {
  const [] = useState('');

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader goBack title="Categories" />
        <CategoriesList list={categories} loading={isLoading} />
      </View>
    </StandardContainer>
  );
};
export default Categories;
