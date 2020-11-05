import { ApolloError } from '@apollo/react-hooks';
import { errors } from '../constants/errors';

export const getErrorMessage = (e: ApolloError) => {
  return e.networkError.result.errors.length > 0
    ? e.networkError.result.errors[0].message.replace(
        'Context creation failed: ',
        ''
      )
    : errors.DEFAULT_ERROR_MESSAGE;
};
