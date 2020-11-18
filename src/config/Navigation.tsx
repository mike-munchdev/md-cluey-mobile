import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext, AppContext } from './context';
import { initialState, appReducer } from './store';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { Search } from '../screens/Search';
import { GetStarted } from '../screens/GetStarted/';
import { Company } from '../screens/Company';

import { AlertHelper } from '../utils/alert';

import { ActivateAccount } from '../screens/ActivateAccount';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../screens/Profile';
import { Friends } from '../screens/Friends';
import { Friend } from '../screens/Friend';
import { Companies } from '../screens/Companies';
import { Categories } from '../screens/Categories';
import { ProductTypes } from '../screens/ProductTypes';
import { MyLikes } from '../screens/MyLikes';
import { Home } from '../screens/Home';
import { RequestPasswordReset } from '../screens/RequestPasswordReset';
import { IUser } from '../interfaces';
import { ResetPassword } from '../screens/ResetPassword';
import { errors } from '../constants/errors';
import { SystemNotifications } from '../screens/SystemNotifications';

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const ClueyStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const MyLikesStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const AppStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const MyLikesStackScreen = () => (
  <MyLikesStack.Navigator screenOptions={{ headerShown: false }}>
    <MyLikesStack.Screen name="MyLikes" component={MyLikes} />
    <MyLikesStack.Screen name="Company" component={Company} />
  </MyLikesStack.Navigator>
);

const FriendsStackScreen = () => (
  <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
    <FriendsStack.Screen name="Friends" component={Friends} />
    <FriendsStack.Screen name="Friend" component={Friend} />
    <FriendsStack.Screen
      name="SystemNotifications"
      component={SystemNotifications}
    />
  </FriendsStack.Navigator>
);

const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={() => <Sidebar />}>
    <Drawer.Screen name="Home" component={ClueyStackScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Friends" component={FriendsStackScreen} />
    <Drawer.Screen name="MyLikes" component={MyLikesStackScreen} />
  </Drawer.Navigator>
);

const AppStackScreen = () => (
  <AppStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Drawer"
  >
    <AppStack.Screen name="Drawer" component={DrawerScreen} />
    <AppStack.Screen name="ResetPassword" component={ResetPassword} />
  </AppStack.Navigator>
);

const ClueyStackScreen = () => (
  <ClueyStack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
    mode="card"
  >
    <ClueyStack.Screen name="Home" component={Home} />
    <ClueyStack.Screen name="Search" component={Search} />
    <ClueyStack.Screen name="Company" component={Company} />
    <ClueyStack.Screen name="Companies" component={Companies} />
    <ClueyStack.Screen name="Categories" component={Categories} />
    <ClueyStack.Screen name="ProductTypes" component={ProductTypes} />
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
    <AuthStack.Screen
      name="ResetPassword"
      component={RequestPasswordReset}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Categories"
      component={Categories}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="ProductTypes"
      component={ProductTypes}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Companies"
      component={Companies}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Company"
      component={Company}
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
          component={AppStackScreen}
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

  const [state, dispatch] = useReducer(appReducer, initialState);

  const authContext = useMemo(() => {
    return {
      getIsStarted: async () => {
        const isStarted = await AsyncStorage.getItem('isStarted');
        return isStarted;
      },
      setIsStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isStarted', String(value));
      },
      redirect: () => {
        // history.push(location);
      },
      signIn: async (
        token: string,
        user: IUser,
        navigation: any,
        location?: string
      ) => {
        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('isStarted', '1');
          dispatch({ type: 'UPDATE_USER', payload: user });
          dispatch({
            type: 'UPDATE_USER_TOKEN',
            payload: token,
          });
          setIsLoading(false);

          if (user.mustResetPassword) {
            navigation.navigate('ResetPassword');
          } else {
            navigation.navigate(location ? location : 'App');
          }
        } catch (error) {
          AlertHelper.show('error', 'Sign In', errors.DEFAULT_ERROR_MESSAGE);
        }
      },
      signUp: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Sign Up', message);
      },
      activateAccount: async (
        token: string,
        user: IUser,
        navigation: any,
        location?: string
      ) => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('isStarted', '1');
        setUserToken(token);
        setUser(user);
        setIsLoading(false);

        if (user.mustResetPassword) {
          navigation.navigate('ResetPassword');
        } else {
          navigation.navigate(location ? location : 'App');
        }
      },
      requestPasswordReset: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Reset Password', message);
      },
      signOut: async (navigation: any) => {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('user');

          setIsLoading(false);
          dispatch({ type: 'UPDATE_USER', payload: null });
          dispatch({
            type: 'UPDATE_USER_TOKEN',
            payload: null,
          });
          navigation.dispatch(StackActions.replace('GetStarted'));
        } catch (error) {
          AlertHelper.show('error', 'Sign Out', errors.DEFAULT_ERROR_MESSAGE);
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

      if (token) {
        dispatch({
          type: 'UPDATE_USER_TOKEN',
          payload: token,
        });
      }
      if (userJson) {
        const user = JSON.parse(userJson || '');

        dispatch({ type: 'UPDATE_USER', payload: user });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsRequesting(false);
    })();
  }, [state.user]);

  if (isLoading || isRequesting) {
    return <Splash finishLoading={() => setIsLoading(false)} />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <AppContext.Provider value={{ dispatch, state }}>
        <NavigationContainer>
          <RootStackScreen userToken={state.token} />
        </NavigationContainer>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};
