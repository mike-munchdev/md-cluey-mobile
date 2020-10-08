import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { IUser } from '../../../interfaces';

export const friendStructure = `{
    id    
    username
    firstName    
    lastName       
    
}`;

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: String!) {
    getUserFriends(userId: $userId) {
      ok
      friends ${friendStructure}
      error {        
        message
      }
      searchText
    }
  }
`;

export const getUserFriendsCompleted = (
  setFriends: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getUserFriends }) => {
  const { ok, friends, error } = getUserFriends;
  setLoading(false);
  if (ok) {
    setFriends(friends);
    setFilteredList(friends);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const getUserFriendsError = (
  setFriends: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setFriends([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const GET_PUBLIC_AND_ACTVE_USERS_BY_NAME = gql`
  query GetPublicAndActiveUsersByName($userId: String!) {
    getPublicAndActiveUsersByName(name: $name, exact: $exact) {
      ok
      friends ${friendStructure}
      error {        
        message
      }
    }
  }
`;

export const getPublicAndActiveUsersByNameError = (
  setFriends: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setFriends([]);
  AlertHelper.show('error', 'Error', 'An error occurred. Please try again.');
};

export const getPublicAndActiveUsersByNameCompleted = (
  setUsers: Function,
  setLoading: Function,
  setCache: Function,
  cache: any
) => async ({ getPublicAndActiveUsersByName }) => {
  const { ok, friends, error, searchText } = getPublicAndActiveUsersByName;
  setLoading(false);
  if (ok) {
    if (searchText) setCache({ ...cache, [searchText]: friends });
    setUsers(friends);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
