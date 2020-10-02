import Bugsnag from '@bugsnag/expo';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

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
  try {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `854065862128-d6n6v1m2gjf1bgml4am349bf1s43fvkc.apps.googleusercontent.com`,
      androidClientId: `854065862128-c9qbpsi1m8frp0a39n6bqq8dhkp2555f.apps.googleusercontent.com`,
      // iosStandaloneAppClientId: `854065862128-d6n6v1m2gjf1bgml4am349bf1s43fvkc.apps.googleusercontent.com`,
      // androidStandaloneAppClientId: `854065862128-c9qbpsi1m8frp0a39n6bqq8dhkp2555f.apps.googleusercontent.com`,
    });

    if (type === 'success') {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      );
      const data = await response.json();

      Promise.resolve({ data, token: accessToken });
    } else {
      throw new Error('Could not successfully connect to Google Login');
    }
  } catch (error) {
    Bugsnag.notify(error);
    Promise.reject(error.message);
  }
};
