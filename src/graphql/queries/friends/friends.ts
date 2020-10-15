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
export const friendshipStructure = `{
    id 
    requester ${friendStructure}
    recipient ${friendStructure}    
    status
}`;

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
  setFriends: Function,
  setFilteredList: Function,
  setLoading: Function
) => async ({ getUserFriends }) => {
  const { ok, friendships, error } = getUserFriends;
  setLoading(false);

  if (ok) {
    setFriends(friendships);
    setFilteredList(friendships);
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
