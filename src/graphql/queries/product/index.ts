import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { errors } from '../../../constants/errors';
import { getErrorMessage, showErrorAlert } from '../../../utils/errors';
import { productsStructure } from '../structures';

export const GET_PRODUCTS_BY_NAME = gql`
  query GetProductsByName($name: String!, $exact: Boolean) {
    getProductsByName(name: $name, exact: $exact) {
      ok
      products ${productsStructure}
      error {        
        message
      }
      searchText
    }
  }
`;

export const getProductsByNameError = (
  setProducts: Function,
  setLoading: Function,
  dispatch: React.Dispatch<any>,
  alertVisible: boolean
) => (e: ApolloError) => {
  setLoading(false);
  setProducts([]);
  showErrorAlert('error', 'Error', getErrorMessage(e), dispatch, alertVisible);
};

export const getProductsByNameCompleted = (
  setProducts: Function,
  setLoading: Function,
  setCache: Function,
  cache: any
) => async ({ getProductsByName }) => {
  const { ok, products, error, searchText } = getProductsByName;
  setLoading(false);
  if (ok) {
    if (searchText) setCache({ ...cache, [searchText]: products });
    setProducts(products);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
