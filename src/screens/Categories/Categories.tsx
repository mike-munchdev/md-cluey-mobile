import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

import CategoriesContainer from './CategoriesContainer';
import styles from './styles';
import theme from '../../constants/theme';
import {
  getCategoriesCompleted,
  getCategoriesError,
  GET_CATEGORIES,
} from '../../graphql/queries/categories/categories';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { RoundedIconButton } from '../../components/Buttons';
import { SimpleListItem } from '../../components/ListItem';

const Categories: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const [getCategories] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
    onError: getCategoriesError(setCategories, setIsLoading),
    onCompleted: getCategoriesCompleted(setCategories, setIsLoading),
  });

  useEffect(() => {
    (async () => {
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
        <View style={styles.categoriesContainer}>
          <FlatList
            contentContainerStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            data={categories}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <SimpleListItem
                  item={item}
                  routeName="ProductTypes"
                  params={{ categoryId: item.id }}
                  title={item.name}
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
      </View>
    </CategoriesContainer>
  );
};
export default Categories;
