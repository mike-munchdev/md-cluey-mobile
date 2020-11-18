import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import {
  getCategoriesCompleted,
  getCategoriesError,
  GET_CATEGORIES,
} from '../../graphql/queries/categories';
import { useLazyQuery } from '@apollo/react-hooks';

import { CategoriesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import { AppContext } from '../../config/context';
import { ClueyInfoIcon } from '../../components/Icons';
import { ClueyInfoModal } from '../../components/Modals';

const Categories: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [] = useState('');

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    onError: getCategoriesError(
      setCategories,
      setIsLoading,
      dispatch,
      state.alertVisible
    ),
    onCompleted: getCategoriesCompleted(setCategories, setIsLoading),
    errorPolicy: 'all',
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
        <NavHeader
          goBack
          title="Categories"
          rightIcon={() => (
            <ClueyInfoIcon
              onPress={async () => {
                setOverlayVisible(true);
              }}
            />
          )}
        />
        <CategoriesList list={categories} loading={isLoading} />
      </View>
      <ClueyInfoModal
        isVisible={overlayVisible}
        setVisible={setOverlayVisible}
      />
    </StandardContainer>
  );
};
export default Categories;
