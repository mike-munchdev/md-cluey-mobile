import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { throttle, debounce } from 'throttle-debounce';

import { useLazyQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';

import styles from './styles';

import { KeyboardAvoidingContainer } from '../../components/Containers';

import AutoCompleteTextInput, {
  IAutoCompleteItemProps,
} from '../../components/TextInput/AutoCompleteTextInput';
import searchSchema from '../../validation/searchSchema';
import {
  getCompaniesByNameCompleted,
  getCompaniesByNameError,
  GET_COMPANIES_BY_NAME,
} from '../../graphql/queries/company';
import { sortByFieldName } from '../../utils/sort';
import { NavHeader } from '../../components/Headers';
import { AppContext } from '../../config/context';

const Search: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [companies, setCompanies] = useState([]);
  const { dispatch, state } = useContext(AppContext);
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
    } else {
      setCompanies([]);
    }
  }, [searchText]);

  const [getCompanysByName] = useLazyQuery(GET_COMPANIES_BY_NAME, {
    fetchPolicy: 'network-only',
    onError: getCompaniesByNameError(
      setCompanies,
      setIsLoading,
      dispatch,
      state.alertVisible
    ),
    onCompleted: getCompaniesByNameCompleted(
      setCompanies,
      setIsLoading,
      setAutoCompleteCache,
      autoCompleteCache
    ),
  });

  const autocompleteSearch = () => {
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
    <KeyboardAvoidingContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavHeader goBack title="Search By Name" />
        <Formik
          initialValues={{
            searchText: '',
          }}
          validationSchema={searchSchema}
          onSubmit={async () => {
            // const { search } = values;
            // await userSignup({
            //   variables: { input: { email, password, firstName, lastName } },
            // });
          }}
        >
          {({ errors, touched, values, handleChange, resetForm }) => {
            return (
              <AutoCompleteTextInput
                autoFocus
                containerStyles={{
                  marginBottom: 20,
                  // marginTop: 10,
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
    </KeyboardAvoidingContainer>
  );
};
export default Search;
