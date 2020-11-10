import React, { createContext } from 'react';
import { IAppStateProps, initialState } from './store';

type AuthContextProps = {
  getIsStarted: () => void;
  setIsStarted: (value: boolean) => void;
  redirect: (location: string) => void;
  signIn: (
    token: string,
    user: any,
    navigation: any,
    location?: string
  ) => void;
  signOut: (navigation: any) => void;
  activateAccount: (message: string, navigation: any) => void;
  requestPasswordReset: (message: string, navigation: any) => void;
  updatePasswordReset: (message: string, navigation: any) => void;
  signUp: (message: string, navigation: any) => void;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AppContext = createContext<{
  state: IAppStateProps;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });
