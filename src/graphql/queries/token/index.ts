import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import { userStructure } from '../structures/';
import { getErrorMessage, showErrorAlert } from '../../../utils/errors';

export const GET_USER_TOKEN = gql`
  query GetUserToken(
    $email: String
    $password: String
    $facebookId: String
    $facebookAuthToken: String
    $googleId: String
    $googleAuthToken: String
    $appleId: String
    $appleAuthToken: String
    $appleIdentityToken: String
  ) {
    getUserToken(email: $email, password: $password, facebookId: $facebookId, facebookAuthToken: $facebookAuthToken, googleId: $googleId, googleAuthToken: $googleAuthToken, appleId: $appleId, appleAuthToken: $appleAuthToken, appleIdentityToken: $appleIdentityToken) {
      ok
      token
      user ${userStructure}      
      error {
        message
      }
    }
  }
`;

export const getUserTokenError = (
  dispatch: React.Dispatch<any>,
  alertVisible: boolean,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  showErrorAlert('error', 'Error', getErrorMessage(e), dispatch, alertVisible);
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
