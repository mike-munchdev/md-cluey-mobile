import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import Bugsnag from '@bugsnag/expo';
import { errors } from '../../../constants/errors';
import { notificationStructure } from '../structures';
import { getErrorMessage } from '../../../utils/errors';

export const GET_USER_SYSTEM_NOTIFICATIONS = gql`
  query GetUserSystemNotifications($userId: String!) {
    getUserSystemNotifications(userId: $userId) {
      ok
      notifications ${notificationStructure}
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
  const { ok, notifications, error } = getUserSystemNotifications;

  setLoading(false);
  if (ok) {
    dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: notifications });
  } else {
    AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
  }
};

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($input: UpdateNotificationInput!) {
    updateNotification(input: $input) {
      ok
      notification ${notificationStructure}      
      error {        
        message
      }
      
    }
  }
`;

export const updateNotificationCompleted = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => async ({ updateNotification }) => {
  const { ok, notification, error } = updateNotification;

  setLoading(false);
  if (ok) {
    dispatch({ type: 'UPDATE_NOTIFICATION', payload: notification });
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const updateNotificationError = (
  dispatch: React.Dispatch<any>,
  setLoading: Function
) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show('error', 'Error', errors.DEFAULT_ERROR_MESSAGE);
};
