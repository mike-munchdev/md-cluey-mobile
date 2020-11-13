import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { IUser } from '../../../interfaces';
import { errors } from '../../../constants/errors';

import {
  publicUserStructure,
  responseStructure,
  userStructure,
} from '../structures';
import { getErrorMessage } from '../../../utils/errors';

export const GET_USER_COMPANY_RESPONSES = gql`
  query GetUserCompanyResponses($userId: String!) {
    getUserCompanyResponses(userId: $userId) {
      ok
      companyResponses ${responseStructure}
      error {        
        message
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      ok
      user ${userStructure}
      error {        
        message
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ok
      user ${userStructure}
      error {        
        message
      }
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($input: UpdateUserPasswordInput!) {
    updateUserPassword(input: $input) {
      ok
      user ${userStructure}
      error {
        message
      }
    }
  }
`;

export const UPDATE_USER_SETTINGS = gql`
  mutation UpdateUserSettings($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      ok
      user ${userStructure}
      error {        
        message
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      user ${userStructure}
      error {        
        message
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation UserSignup($input: UserSignupInput!) {
    userSignup(input: $input) {
      ok
      message
      error {
        message
      }
    }
  }
`;

export const ADD_PUSH_TOKEN = gql`
  mutation AddPushToken($input: AddPushToken!) {
    addPushToken(input: $input) {
      ok
      user ${userStructure}
      error {
        message
      }
    }
  }
`;

export const ACTIVATE_USER_ACCOUNT = gql`
  mutation ActivateUserAccount($input: ActivateUserAccountInput!) {
    activateUserAccount(input: $input) {
      ok
      token
      user ${userStructure}      
      error {
        message
      }
    }
  }
`;

export const UPDATE_COMPANY_RESPONSE_FOR_USER = gql`
  mutation UpdateCompanyResponseForUser($input: UserCompanyResponseInput!) {
    updateCompanyResponseForUser(input: $input) {
      ok
      companyResponse ${responseStructure}
      error {
        message
      }
    }
  }
`;

export const GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME = gql`
  query GetPublicAndActiveNonFriendsByName($name: String!, $exact: Boolean) {
    getPublicAndActiveNonFriendsByName(name: $name, exact: $exact) {
      ok
      users ${publicUserStructure}
      error {        
        message
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      ok
      message
      error {
        message
      }
    }
  }
`;

export const userSignupError = (setLoading: Function) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const userSignupCompleted = (
  signUp: Function,
  navigation: any,
  setLoading: Function
) => async ({ userSignup }) => {
  const { ok, message, error } = userSignup;
  setLoading(false);
  if (ok) {
    if (!message) {
      AlertHelper.show(
        'error',
        'Error',
        'No user found with the given information.'
      );
    } else {
      await signUp(message, navigation);
    }
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const updateUserError = (setLoading: Function) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred and has been logged. Please try again.'
  );
};

export const updateUserCompleted = (
  setLoading: Function,
  dispatch: React.Dispatch<any>
) => async ({ updateUser }) => {
  const { ok, user, error } = updateUser;

  if (ok) {
    setLoading(false);
    if (!user) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      dispatch({ type: 'UPDATE_USER', payload: user });
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const updateUserSettingsError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred and has been logged. Please try again.'
  );
};

export const updateUserSettingsCompleted = (
  setLoading: Function,
  setUser: (user: IUser) => void
) => async ({ updateUserSettings }) => {
  const { ok, user, error } = updateUserSettings;

  if (ok) {
    setLoading(false);
    if (!user) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      AlertHelper.show('success', 'Success', 'Information saved.');
      dispatch({ type: 'UPDATE_USER', payload: user });
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const addPushTokenError = (
  setLoading: Function,
  setRequesting: Function
) => (e: ApolloError) => {
  setLoading(false);
  setRequesting(false);

  // AlertHelper.show(
  //   'error',
  //   'Error',
  //   'An error occurred adding push notification information. Please try again.'
  // );
};

export const addPushTokenCompleted = (
  setLoading: Function,
  dispatch: React.Dispatch<any>,
  setRequesting: Function
) => async ({ addPushToken }) => {
  const { ok, user, error } = addPushToken;

  setRequesting(false);
  if (ok) {
    setLoading(false);
    if (!user) {
      // AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      // AlertHelper.show('success', 'Success', 'Information saved.');
      dispatch({ type: 'UPDATE_USER', payload: user });
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const activateUserAccountError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  Bugsnag.notify(e);
};

export const activateUserAccountCompleted = (
  signIn: (
    token: string,
    user: any,
    navigation: any,
    location?: string
  ) => void,
  navigation: any,
  location: string,
  setLoading: Function
) => async ({ activateUserAccount }) => {
  const { ok, token, user, error } = activateUserAccount;

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
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const updateCompanyResponseForUserError = (
  setCompanyResponse: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanyResponse(null);
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const updateCompanyResponseForUserCompleted = (
  setCompanyResponse: Function,
  setLoading: Function
) => async ({ updateCompanyResponseForUser }) => {
  const { ok, companyResponse, error } = updateCompanyResponseForUser;

  setLoading(false);
  if (ok) {
    setCompanyResponse(companyResponse);
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const updateUserPasswordError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred and has been logged. Please try again.'
  );
};

export const updateUserPasswordCompleted = (
  setLoading: Function,
  dispatch: React.Dispatch<any>,
  navigation?: any,
  location?: string | undefined
) => async ({ updateUserPassword }) => {
  const { ok, user, error } = updateUserPassword;

  if (ok) {
    setLoading(false);
    AlertHelper.show('success', 'Reset Password', 'Password Reset');
    if (dispatch) {
      dispatch({ type: 'UPDATE_USER', payload: user });
    }
    if (navigation && location) {
      navigation.navigate(location);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const getUserCompanyResponsesError = (reset: Function) => (
  e: ApolloError
) => {
  reset();
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred and has been logged. Please try again.'
  );
};

export const getUserCompanyResponsesCompleted = (
  reset: Function,
  dispatch: React.Dispatch<any>,
  setFilteredList: Function
) => async ({ getUserCompanyResponses }) => {
  const { ok, companyResponses, error } = getUserCompanyResponses;

  if (ok) {
    dispatch({
      type: 'UPDATE_USER_COMPANY_RESPONSES',
      payload: companyResponses,
    });

    setFilteredList(companyResponses);
    reset();
  } else {
    reset();
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const getPublicAndActiveNonFriendsByNameError = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  dispatch({ type: 'UPDATE_PUBLIC_USERS', payload: [] });
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const getPublicAndActiveNonFriendsByNameCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function,
  setCache: Function,
  cache: any
) => async ({ getPublicAndActiveNonFriendsByName }) => {
  const { ok, users, error, searchText } = getPublicAndActiveNonFriendsByName;
  setLoading(false);

  if (ok) {
    if (searchText) setCache({ ...cache, [searchText]: users });
    dispatch({ type: 'UPDATE_PUBLIC_USERS', payload: users });
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const resetPasswordError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  Bugsnag.notify(e);
};

export const resetPasswordCompleted = (
  requestPasswordReset: (message: string, navigation: any) => void,
  setLoading: Function,
  navigation: any
) => async ({ resetPassword }) => {
  const { ok, message, error } = resetPassword;

  setLoading(false);
  if (ok) {
    if (!message) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given token.'
      );
    } else {
      await requestPasswordReset(message, navigation);
    }
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const updateUserPasswordInternalError = (resetDialog: Function) => (
  e: ApolloError
) => {
  resetDialog();
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred and has been logged. Please try again.'
  );
};

export const updateUserPasswordInternalCompleted = (
  resetDialog: Function,
  dispatch: React.Dispatch<any>
) => async ({ updateUserPassword }) => {
  const { ok, user, error } = updateUserPassword;
  resetDialog();
  if (ok) {
    AlertHelper.show('success', 'Reset Password', 'Password Reset');
    if (dispatch) {
      dispatch({ type: 'UPDATE_USER', payload: user });
    }
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const getUserByIdError = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  dispatch({ type: 'UPDATE_FRIEND', payload: null });

  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
};

export const getUserByIdCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => async ({ getUserById }) => {
  const { ok, user, error } = getUserById;
  setLoading(false);
  if (ok) {
    dispatch({ type: 'UPDATE_FRIEND', payload: user });
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};
