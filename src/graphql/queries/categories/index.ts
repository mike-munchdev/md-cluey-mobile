import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { errors } from '../../../constants/errors';
import { getErrorMessage, showErrorAlert } from '../../../utils/errors';

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
  setLoading: Function,
  dispatch: React.Dispatch<any>,
  alertVisible: boolean
) => (e: ApolloError) => {
  setLoading(false);
  setCategories([]);

  showErrorAlert('error', 'Error', getErrorMessage(e), dispatch, alertVisible);
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
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};
