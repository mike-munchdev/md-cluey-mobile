import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { throttle, debounce } from 'throttle-debounce';

import styles from './styles';

import { StandardContainer } from '../../components/Containers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import AutoCompleteTextInput, {
  IAutoCompleteItemProps,
} from '../../components/TextInput/AutoCompleteTextInput';
import { PageHeaderText } from '../../components/Text';
import { Formik } from 'formik';
import { searchSchema } from '../../validation/searchSchema';
import {
  getCompaniesByNameCompleted,
  getCompaniesByNameError,
  GET_COMPANIES_BY_NAME,
} from '../../graphql/queries/company/companies';
import { useLazyQuery } from '@apollo/react-hooks';
import { sortByFieldName } from '../../utils/sort';

const Search: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [companies, setCompanies] = useState([]);

  const [autoCompleteCache, setAutoCompleteCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [
    selectedCompany,
    setSelectedCompany,
  ] = useState<IAutoCompleteItemProps | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedCompany) {
      const company = companies.find((p) => p.id === selectedCompany.id);
      setSearchText('');
      navigation.navigate('Company', { company });
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (searchText.length < 5 && searchText.length >= 3) {
      const cached = autoCompleteCache[searchText];
      if (cached) {
        setCompanies(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        autocompleteSearchThrottled(searchText);
      }
    } else if (searchText.length >= 5) {
      const cached = autoCompleteCache[searchText];
      if (cached) {
        setCompanies(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        autocompleteSearchDebounced(searchText);
      }
    }
  }, [searchText]);

  const [getCompanysByName] = useLazyQuery(GET_COMPANIES_BY_NAME, {
    fetchPolicy: 'network-only',
    onError: getCompaniesByNameError(setCompanies, setIsLoading),
    onCompleted: getCompaniesByNameCompleted(
      setCompanies,
      setIsLoading,
      setAutoCompleteCache,
      autoCompleteCache
    ),
  });

  const autocompleteSearch = (query: string) => {
    getCompanysByName({
      variables: {
        name: searchText,
        exact: false,
      },
    });
  };

  const autocompleteSearchDebounced = debounce(500, autocompleteSearch);
  const autocompleteSearchThrottled = throttle(500, autocompleteSearch);

  return (
    <StandardContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavigationHeader goBack />
        <Formik
          initialValues={{
            searchText: '',
          }}
          validationSchema={searchSchema}
          onSubmit={async (values) => {
            // const { search } = values;
            // await userSignup({
            //   variables: { input: { email, password, firstName, lastName } },
            // });
          }}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleSubmit,
            resetForm,
          }) => {
            return (
              <AutoCompleteTextInput
                containerStyles={{
                  marginBottom: 20,
                  marginTop: 10,
                  marginHorizontal: 40,
                }}
                isLoading={isLoading}
                label="SEARCH TEXT"
                placeholder="Search Companys, Brands and Retailers"
                name="searchText"
                value={values.searchText}
                errors={errors}
                touched={touched}
                handleChange={(e) => {
                  handleChange('searchText')(e);
                  setSearchText(e);
                }}
                handleItemPress={(item) => setSelectedCompany(item)}
                handleIconPress={() => {
                  setCompanies([]);
                  resetForm();
                }}
                data={sortByFieldName(
                  companies.map((p) => ({
                    id: p.id,
                    title: p.name,
                    description: 'description',
                    value: p.id,
                  })),
                  'name',
                  'asc'
                )}
              />
            );
          }}
        </Formik>
      </View>
    </StandardContainer>
  );
};
export default Search;
