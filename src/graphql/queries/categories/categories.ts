import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';

export const categoriesStructure = `{    
    id
    name
    isActive
    logoUrl
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      ok
      categories ${categoriesStructure}
      error {        
        message
      }
    }
  }
`;

export const getCategoriesError = (
  setCategories: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCategories([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getCategoriesCompleted = (
  setCategories: Function,
  setLoading: Function
) => async ({ getCategories }) => {
  const { ok, categories, error, searchText } = getCategories;

  setLoading(false);
  if (ok) {
    setCategories(categories);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
