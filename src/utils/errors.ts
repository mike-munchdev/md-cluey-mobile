import { useContext } from 'react';
import { ApolloError } from '@apollo/react-hooks';

import { Alert, Linking, Platform } from 'react-native';
import { DropdownAlertType } from 'react-native-dropdownalert';
import { errors } from '../constants/errors';
import { AlertHelper } from './alert';
import { AppContext } from '../config/context';

export const showErrorAlert = (
  type: DropdownAlertType,
  title: string,
  message: string,
  dispatch: React.Dispatch<any>,
  alertVisible: boolean
) => {
  if (message.startsWith('Version mismatch')) {
    if (!alertVisible) {
      dispatch({ type: 'UPDATE_ALERT_VISIBLE', payload: true });
      Alert.alert(
        title,
        message,
        [
          {
            text: `Go to ${Platform.OS === 'ios' ? 'App' : 'Play'} Store`,
            onPress: async () => {
              dispatch({ type: 'UPDATE_ALERT_VISIBLE', payload: false });
              if (Platform.OS === 'ios') {
                await Linking.openURL(
                  'itms-apps://itunes.apple.com/us/app/apple-store/id1533356974?mt=8'
                );
              } else {
                await Linking.openURL('market://details?id=myandroidappid');
              }
            },
          },
        ],
        {
          cancelable: false,
          onDismiss: () => {
            dispatch({ type: 'UPDATE_ALERT_VISIBLE', payload: false });
          },
        }
      );
    }
  } else {
    AlertHelper.show(type, title, message);
  }
};

export const getErrorMessage = (e: ApolloError) => {
  return e.networkError.result.errors.length > 0
    ? e.networkError.result.errors[0].message.replace(
        'Context creation failed: ',
        ''
      )
    : errors.DEFAULT_ERROR_MESSAGE;
};
