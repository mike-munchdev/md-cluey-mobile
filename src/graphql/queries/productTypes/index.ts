import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { errors } from '../../../constants/errors';
import { productTypesStructure } from '../structures';
import { getErrorMessage, showErrorAlert } from '../../../utils/errors';

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
  setLoading: Function,
  dispatch: React.Dispatch<any>,
  alertVisible: boolean
) => (e: ApolloError) => {
  setLoading(false);
  setProductTypes([]);
  showErrorAlert('error', 'Error', getErrorMessage(e), dispatch, alertVisible);
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
