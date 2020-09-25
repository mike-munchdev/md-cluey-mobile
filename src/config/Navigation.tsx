import React, { useEffect, useState, useMemo, createContext } from 'react';
import {
  NavigationContainer,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext, AppContext } from './context';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { Search } from '../screens/Search';
import { GetStarted } from '../screens/GetStarted/';
import { Company } from '../screens/Company';

import { AlertHelper } from '../utils/alert';

import {
  ADD_PUSH_TOKEN,
  addPushTokenError,
  addPushTokenCompleted,
} from '../graphql/queries/user/user';
import { ActivateAccount } from '../screens/ActivateAccount';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../screens/Profile';
import { Friends } from '../screens/Friends';
import { Friend } from '../screens/Friend';
import { Companies } from '../screens/Companies';
import { Categories } from '../screens/Categories';

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const ClueyStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const FriendsStackScreen = () => (
  <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
    <FriendsStack.Screen name="Friends" component={Friends} />
    <FriendsStack.Screen name="Friend" component={Friend} />
  </FriendsStack.Navigator>
);
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Search" drawerContent={() => <Sidebar />}>
    <Drawer.Screen name="Search" component={ClueyStackScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Friends" component={FriendsStackScreen} />
  </Drawer.Navigator>
);

const ClueyStackScreen = () => (
  <ClueyStack.Navigator
    initialRouteName="Search"
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    <ClueyStack.Screen name="Search" component={Search} />
    <ClueyStack.Screen name="Company" component={Company} />
    <ClueyStack.Screen name="Companies" component={Companies} />
    <ClueyStack.Screen name="Categories" component={Categories} />
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
    <AuthStack.Screen
      name="ActivateAccount"
      component={ActivateAccount}
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
          component={DrawerScreen}
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
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const updateLocation = async (location: any) => {
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
      signIn: async (
        token: string,
        user: any,
        navigation: any,
        location?: string
      ) => {
        try {
          setIsLoading(false);
          setUserToken(token);
          setUser(user);

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.navigate(location ? location : 'Search');
        } catch (error) {
          AlertHelper.show('error', 'Sign In', error.message);
        }
      },
      signUp: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Sign Up', message);
      },
      activateAccount: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Activation', message);
      },
      signOut: async (navigation: any) => {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('user');

          setIsLoading(false);
          setUserToken(null);
          setUser(null);
          navigation.dispatch(StackActions.replace('SignIn'));
        } catch (error) {
          AlertHelper.show('error', 'Sign Out', error.message);
        }
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
        // const pushToken = await registerForPushNotificationsAsync();
        // await addPushToken({
        //   variables: {
        //     input: {
        //       userId: user.id,
        //       pushToken,
        //     },
        //   },
        // });
      }
      setIsRequesting(false);
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
