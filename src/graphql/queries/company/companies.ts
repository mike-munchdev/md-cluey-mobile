import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';

export const companiesStructure = `{    
    id
    name
    brandUrl
    brandLogoUrl     
  }
`;

export const GET_COMPANIES_BY_NAME = gql`
  query GetCompaniesByName($name: String!, $exact: Boolean) {
    getCompaniesByName(name: $name, exact: $exact) {
      ok
      companies ${companiesStructure}
      error {        
        message
      }
      searchText
    }
  }
`;

export const getCompaniesByNameError = (
  setCompanies: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred during signup. Please try again.'
  );
};

export const getCompaniesByNameCompleted = (
  setCompanies: Function,
  setLoading: Function,
  setCache: Function,
  cache: any
) => async ({ getCompaniesByName }) => {
  const { ok, companies, error, searchText } = getCompaniesByName;
  setLoading(false);
  if (ok) {
    if (searchText) setCache({ ...cache, [searchText]: companies });
    setCompanies(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const GET_COMPANIES_BY_CATEGORY = gql`
  query GetCompaniesByCategory($id: String!) {
    getCompaniesByCategory(id: $id) {
      ok
      companies ${companiesStructure}
      error {        
        message
      }     
    }
  }
`;

export const getCompaniesByCategoryError = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  setFilteredList([]);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred during signup. Please try again.'
  );
};

export const getCompaniesByCategoryCompleted = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getCompaniesByCategory }) => {
  const { ok, companies, error } = getCompaniesByCategory;
  setLoading(false);
  if (ok) {
    setCompanies(companies);
    setFilteredList(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const GET_COMPANIES_BY_PRODUCT_TYPE = gql`
  query GetCompaniesByProductType($id: String!) {
    getCompaniesByProductType(id: $id) {
      ok
      companies ${companiesStructure}
      error {        
        message
      }     
    }
  }
`;

export const getCompaniesByProductTypeError = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanies([]);
  setFilteredList([]);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred during signup. Please try again.'
  );
};

export const getCompaniesByProductTypeCompleted = (
  setCompanies: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getCompaniesByProductType }) => {
  const { ok, companies, error } = getCompaniesByProductType;
  setLoading(false);
  if (ok) {
    setCompanies(companies);
    setFilteredList(companies);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
