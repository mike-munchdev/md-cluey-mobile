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
        <View>
          <NavigationHeader goBack />
        </View>
        <View style={styles.companiesContainer}>
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 20 }}>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('Company', { companyId: item.id })
                    }
                  >
                    <ListItem
                      key={item.id}
                      bottomDivider
                      style={{ marginBottom: 5, backgroundColor: theme.light }}
                    >
                      <Avatar rounded source={{ uri: item.brandLogoUrl }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.brandUrl}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </TouchableOpacity>
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
                      No companies
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </CategoriesContainer>
  );
};
export default Categories;
