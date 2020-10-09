import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { NODE_ENV } from '../hooks/serverInfo';

export const facebookAuthentication = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
        );
        const data = await response.json();

        resolve({ data, token });
      } else {
        throw new Error('Could not successfully connect to Facebook Login');
      }
    } catch (error) {
      Bugsnag.notify(error);
      reject(error.message);
    }
  });
};

export const googleAuthentication = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const iosClientId =
        '576013538553-pdsto80kets3kd92o2jguikmkvtvnas5.apps.googleusercontent.com';
      // const iosClientId = Constants.manifest.extra.appVariables[String(NODE_ENV)]
      // .googleClientIdIos;
      const androidClientId =
        '576013538553-d8gffmivuiibqtcilddvcd8ajs91e2vj.apps.googleusercontent.com';
      // const androidClientId =
      //   Constants.manifest.extra.appVariables[String(NODE_ENV)]
      //     .googleClientIdAndroid;
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId,
        androidClientId,
        iosStandaloneAppClientId: iosClientId,
        androidStandaloneAppClientId: androidClientId,
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
        );
        const data = await response.json();
        resolve({ data, token: accessToken });
      } else {
        throw new Error('Could not successfully connect to Google Login');
      }
    } catch (error) {
      Bugsnag.notify(error);
      reject(error);
    }
  });
};
