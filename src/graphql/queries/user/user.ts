import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { IUser } from '../../../interfaces';

export const userStructure = `{
    id
    email
    firstName
    middleName
    lastName   
    dob
    city
    state
    gender     
    googleId
    facebookId
    pushTokens
    createdAt
    isProfilePublic
    isActive
    responses {
      id
      company {
        id
      }
      response
    }
}`;

export const responseStructure = `{  
    id
    company {
      id
    }
    response  
}`;

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
      message
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
  mutation ActivateUserAccount($confirmToken: String!) {
    activateUserAccount(confirmToken: $confirmToken) {
      ok
      message
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
      response ${responseStructure}
      error {
        message
      }
    }
  }
`;

export const userSignupError = (e: ApolloError) => {
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const userSignupCompleted = (
  signUp: Function,
  navigation: any
) => async ({ userSignup }) => {
  const { ok, message, error } = userSignup;

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
    AlertHelper.show('error', 'Error', error.message);
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
  setUser: ((user: IUser) => void) | undefined
) => async ({ updateUser }) => {
  const { ok, user, error } = updateUser;

  if (ok) {
    setLoading(false);
    if (!user) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      setUser(user);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
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
      setUser(user);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
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
  setUser: ((user: IUser) => void) | undefined,
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
      setUser(user);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
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
  activateAccount: (message: string, navigation: any) => void,
  setLoading: Function,
  navigation: any
) => async ({ activateUserAccount }) => {
  const { ok, message, error } = activateUserAccount;

  setLoading(false);
  if (ok) {
    if (!message) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given token.'
      );
    } else {
      await activateAccount(message, navigation);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const updateCompanyResponseForUserError = (
  setCompanyResponse: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setCompanyResponse(null);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const updateCompanyResponseForUserCompleted = (
  setCompanyResponse: Function,
  setLoading: Function
) => async ({ updateCompanyResponseForUser }) => {
  const { ok, response, error } = updateCompanyResponseForUser;

  setLoading(false);
  if (ok) {
    setCompanyResponse(response);
  } else {
    AlertHelper.show('error', 'Error', error.message);
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
  setUser: ((user: IUser) => void) | undefined
) => async ({ updateUserPassword }) => {
  const { ok, message, error } = updateUserPassword;

  if (ok) {
    setLoading(false);
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};
