import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import { userStructure } from '../user/user';

export const GET_USER_TOKEN = gql`
  query GetUserToken(
    $email: String
    $password: String
    $facebookId: String
    $facebookAuthToken: String
    $googleId: String
    $googleAuthToken: String
  ) {
    getUserToken(email: $email, password: $password, facebookId: $facebookId, facebookAuthToken: $facebookAuthToken, googleId: $googleId, googleAuthToken: $googleAuthToken) {
      ok
      token
      user ${userStructure}      
      error {
        message
      }
    }
  }
`;

export const getUserTokenError = (setLoading: Function) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred retrieving user information. Please try again.'
  );
};

export const getUserTokenCompleted = (
  signIn: (
    token: string,
    user: any,
    navigation: any,
    location?: string
  ) => void,
  navigation: any,
  location: string,
  setLoading: Function
) => async ({ getUserToken }) => {
  const { ok, token, user, error } = getUserToken;
  setLoading(false);
  if (ok) {
    if (!token) {
      AlertHelper.show(
        'error',
        'Error',
        'No user found with the given information.'
      );
    } else {
      await signIn(token, user, navigation, location);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
