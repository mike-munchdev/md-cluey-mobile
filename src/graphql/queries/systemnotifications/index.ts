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
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: [] });
  AlertHelper.show('error', 'Error', getErrorMessage(e));
};

export const getUserSystemNotificationsCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => async ({ getUserSystemNotifications }) => {
  const { ok, systemNotifications, error } = getUserSystemNotifications;
  console.log('getUserSystemNotificationsCompleted', systemNotifications);

  setLoading(false);
  if (ok) {
    dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: systemNotifications });
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};
