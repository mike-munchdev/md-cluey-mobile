import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { errors } from '../../../constants/errors';
import { systemNotificationStructure } from '../structures';
import { getErrorMessage } from '../../../utils/errors';

export const GET_USER_SYSTEM_NOTIFICATIONS = gql`
  query GetUserSystemNotifications($userId: String!) {
    getUserSystemNotifications(userId: $userId) {
      ok
      systemNotifications ${systemNotificationStructure}
      error {        
        message
      }
    }
  }
`;

export const getUserSystemNotificationsError = (
  setUserSystemNotifications: Function,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  setUserSystemNotifications([]);
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const getUserSystemNotificationsCompleted = (
  setUserSystemNotifications: Function,
  setLoading: Function
) => async ({ getUserSystemNotifications }) => {
  // console.log(
  //   'getUserSystemNotificationsCompleted',
  //   getUserSystemNotificationsCompleted
  // );
  const { ok, systemNotifications, error } = getUserSystemNotifications;

  setLoading(false);
  if (ok) {
    setUserSystemNotifications(systemNotifications);
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};
