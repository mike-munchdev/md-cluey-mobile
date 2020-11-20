import React, { useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import { Avatar, Provider } from 'react-native-paper';
import { View, Text } from 'react-native';
import * as Facebook from 'expo-facebook';

import App from './src/index';
import theme from './src/constants/theme';
import { AlertHelper } from './src/utils/alert';
import { NODE_ENV } from './src/hooks/serverInfo';

Bugsnag.start(Constants.manifest.extra.bugsnag.apiKey);
const ErrorBoundary = Bugsnag.getPlugin('react');

const ErrorView = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.dark.rgba(0.4),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar.Icon
        size={96}
        icon="logout"
        style={{ backgroundColor: theme.dark.hex }}
        color={theme.text}
      />
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 18,
          marginTop: 10,
          fontWeight: 'bold',
        }}
      >
        An error occurred and has been logged.
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 18,
          marginTop: 10,
          fontWeight: 'bold',
        }}
      >
        Please exit the app and restart.
      </Text>
    </View>
  );
};
export default () => {
  useEffect(() => {
    (async () => {
      try {
        await Facebook.initializeAsync(
          Constants.manifest.facebookAppId,
          Constants.manifest.facebookDisplayName
        );
      } catch (error) {
        AlertHelper.show('error', 'Facebook', 'Facebook initialization failed');
      }
    })();
  }, []);
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider>
        <App />
      </Provider>
    </ErrorBoundary>
  );
};
