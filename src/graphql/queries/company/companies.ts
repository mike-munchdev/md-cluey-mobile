import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';

export const companiesStructure = `{    
    id
    name
    brandUrl
    parentCompanies {      
        id
        name
    }   
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
