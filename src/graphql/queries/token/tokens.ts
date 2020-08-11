import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import { userStructure } from '../user/user';

export const GET_USER_TOKEN_BY_EMAIL_AND_PASSWORD = gql`
  query GetUserTokenByEmailAndPassword(
    $email: String!
    $password: String!
  ) {
    getUserTokenByEmailAndPassword(email: $email, password: $password) {
      ok
      token
      user ${userStructure}
      
      error {
        message
      }
    }
  }
`;

export const getUserTokenByEmailAndPasswordError = (e: ApolloError) => {
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred retrieving user information. Please try again.'
  );
};

export const getUserTokenByEmailAndPasswordCompleted = (
  signIn: (token: string, user: any) => void
) => async ({ getUserTokenByEmailAndPassword }) => {
  const { ok, token, user, error } = getUserTokenByEmailAndPassword;
  if (ok) {
    if (!token) {
      AlertHelper.show(
        'error',
        'Error',
        'No user found with the given information.'
      );
    } else {
      await signIn(token, user);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
