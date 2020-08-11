import React, { useEffect, useState, useMemo, createContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';
import { Splash, SignIn, SignUp } from '../screens';

import { AuthContext, P, AppContext } from './context';
import GetStarted from '../screens/GetStarted/GetStarted.screen';

import { AlertHelper } from '../utils/alert';

import { registerForPushNotificationsAsync } from '../utils/notifications';
import {
  ADD_PUSH_TOKEN,
  addPushTokenError,
  addPushTokenCompleted,
} from '../graphql/queries/user/user';
import { useMutation } from '@apollo/react-hooks';

const AuthStack = createStackNavigator();

const ClueyStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const ClueyStackScreen = () => (
  <ClueyStack.Navigator
    initialRouteName="ClueySearch"
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    {/* <ClueyStack.Screen name="RxHistory" component={RxHistory} />
    <ClueyStack.Screen name="NewRx" component={NewRx} /> */}
    {/*<ClueyStack.Screen name="ScanRx" component={ScanRx} />
     <ClueyStack.Screen name="ScanRxBottle" component={ScanRxBottle} />
    <ClueyStack.Screen name="ManualRxEntry" component={ManualRxEntry} /> */}

    {/* <ClueyStack.Screen
      name="Modal"
      component={Modal}
      options={{
        animationEnabled: true,
        cardStyle: { backgroundColor: 'rgba(0,0,0,0.15)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          };
        },
      }}
    /> */}
  </ClueyStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = (props: any) => {
  const { userToken } = props;

  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={ClueyStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  const [addPushToken] = useMutation(ADD_PUSH_TOKEN, {
    fetchPolicy: 'no-cache',
    onError: addPushTokenError(setIsLoading, setIsRequesting),
    onCompleted: addPushTokenCompleted(setIsLoading, setUser, setIsRequesting),
  });

  const updateUser = async (user: any) => {
    // console.log('updateUser', user);
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const updateLocation = async (location: any) => {
    // console.log('updateLocation', location);
    setLocation(location);
    await AsyncStorage.setItem('location', JSON.stringify(location));
  };

  const authContext = useMemo(() => {
    return {
      getIsStarted: async () => {
        const isStarted = await AsyncStorage.getItem('isStarted');
        return isStarted;
      },
      setIsStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isStarted', String(value));
      },
      redirect: (location: string) => {
        // history.push(location);
      },
      signIn: async (token: string, user: any, location?: string) => {
        setIsLoading(false);
        setUserToken(token);
        setUser(user);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      },
      signUp: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Sign Up', message);
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('location');
        await AsyncStorage.removeItem('pharmacy');
        setIsLoading(false);
        setUserToken(null);
        setUser(null);
        setLocation(null);
      },
      isLoggedIn: async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        return isLoggedIn;
      },
    };
  }, []);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const pharmacyJson = await AsyncStorage.getItem('pharmacy');
      if (token) {
        setUserToken(token);
      }
      if (userJson) {
        setUser(JSON.parse(userJson || ''));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const pushToken = await registerForPushNotificationsAsync();

        await addPushToken({
          variables: {
            input: {
              userId: user.id,
              pushToken,
            },
          },
        });
      } else {
        setIsRequesting(false);
      }
    })();
  }, [user]);

  if (isLoading || isRequesting) {
    return <Splash finishLoading={() => setIsLoading(false)} />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <AppContext.Provider
        value={{
          user: user,
          setUser: updateUser,
          location: location,
          setLocationContext: updateLocation,
        }}
      >
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};
