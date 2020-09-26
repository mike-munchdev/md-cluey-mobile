import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';

export const productTypesStructure = `{    
    id
    name
    
  }
`;

export const GET_PRODUCT_TYPES_BY_CATEGORY = gql`
  query GetProductTypesByCategory ($id: String!) {
    getProductTypesByCategory (id: $id) {
      ok
      productTypes ${productTypesStructure}
      error {        
        message
      }
      
    }
  }
`;

export const getProductTypesByCategoryError = (
  setProductTypes: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setProductTypes([]);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred during signup. Please try again.'
  );
};

export const getProductTypesByCategoryCompleted = (
  setProductTypes: Function,
  setLoading: Function
) => async ({ getProductTypesByCategory }) => {
  const { ok, productTypes, error, searchText } = getProductTypesByCategory;
  setLoading(false);
  if (ok) {
    setProductTypes(productTypes);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
