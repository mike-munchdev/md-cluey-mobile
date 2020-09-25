import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

import CategoriesContainer from './CompaniesContainer';
import styles from './styles';
import theme from '../../constants/theme';
import {
  getCompaniesByCategoryCompleted,
  getCompaniesByCategoryError,
  GET_COMPANIES_BY_CATEGORY,
} from '../../graphql/queries/company/companies';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import NavigationHeader from '../../components/Headers/NavigationHeader';

const Categories: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );

  const navigation = useNavigation();
  const [getCompaniesByCategory] = useLazyQuery(GET_COMPANIES_BY_CATEGORY, {
    fetchPolicy: 'network-only',
    onError: getCompaniesByCategoryError(
      setCompanies,
      setFilteredList,
      setIsLoading
    ),
    onCompleted: getCompaniesByCategoryCompleted(
      setCompanies,
      setFilteredList,
      setIsLoading
    ),
  });

  useEffect(() => {
    (async () => {
      if (categoryId) {
        await getCompaniesByCategory({
          variables: {
            id: categoryId,
          },
        });
      }
    })();
  }, [categoryId]);

  useEffect(() => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = companies.filter((c) =>
      c.name.toLowerCase().includes(searchLowercase)
    );

    setFilteredList(newList);
  }, [searchQuery]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <CategoriesContainer>
      <View style={styles.overlayContainer}>
        <View>
          <NavigationHeader goBack />
        </View>
        <View style={styles.companiesContainer}>
          <Searchbar
            style={{ marginBottom: 10, marginTop: 20 }}
            placeholder="Name"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 20 }}>
            <FlatList
              data={filteredList}
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
                      {/* <Avatar rounded source={{ uri: item.brandLogoUrl }} /> */}
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
