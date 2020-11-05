import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { IUser } from '../../../interfaces';
import { errors } from '../../../constants/errors';

import { friendshipStructure, userStructure } from '../structures';
import { getErrorMessage } from '../../../utils/errors';

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: String!) {
    getUserFriends(userId: $userId) {
      ok
      friendships ${friendshipStructure}
      error {        
        message
      }
      searchText
    }
  }
`;

export const getUserFriendsCompleted = (
  dispatch: React.Dispatch<any>,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getUserFriends }) => {
  const { ok, friendships, error } = getUserFriends;
  setLoading(false);

  if (ok) {
    dispatch({ type: 'UPDATE_FRIENDS', payload: friendships });
    setFilteredList(friendships);
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const getUserFriendsError = (
  setFriends: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setFriends([]);
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const REQUEST_FRIENDSHIP = gql`
  mutation RequestFriendship($input: RequestFriendshipInput!) {
    requestFriendship(input: $input) {
      ok
      friendship ${friendshipStructure}
      error {        
        message
      }      
    }
  }
`;

export const requestFriendshipCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => async ({ requestFriendship }) => {
  const { ok, friendship, error } = requestFriendship;
  setLoading(false);
  if (ok) {
    dispatch({ type: 'ADD_FRIEND', payload: friendship });
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const requestFriendshipError = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);

  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
};

export const ACCEPT_FRIENDSHIP = gql`
  mutation AcceptFriendship($input: AcceptFriendshipInput!) {
    acceptFriendship(input: $input) {
      ok
      friendships ${friendshipStructure}
      error {        
        message
      }
      searchText 
    }
  }
`;

export const acceptFriendshipCompleted = (
  setNotifications: Function,
  setLoading: Function
) => async ({ setNotifications }) => {
  const { ok, notifications, error } = acceptFriendship;
  setLoading(false);
  if (ok) {
    setNotifications(notifications);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const acceptFriendshipError = (
  setNotifications: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
};

export const GET_FRIENDSHIP_BETWEEN_USERS = gql`
  query GetFriendshipBetweenUsers($userId1: String!, $userId2: String!) {
    getFriendshipBetweenUsers(userId1: $userId1, userId2: $userId2) {
      ok
      friendship ${friendshipStructure}
      error {        
        message
      }      
    }
  }
`;

export const getFriendshipBetweenUsersCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => async ({ getFriendshipBetweenUsers }) => {
  const { ok, friendship, error } = getFriendshipBetweenUsers;
  setLoading(false);
  if (ok) {
    dispatch({ type: 'UPDATE_FRIENDSHIP', payload: friendship });
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const getFriendshipBetweenUsersError = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);

  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
};
