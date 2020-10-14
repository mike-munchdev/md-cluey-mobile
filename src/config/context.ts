import React, { createContext } from 'react';
import { IUser, ILocation } from '../interfaces';

export type AppContextStateProps = {
  setUser: (user: IUser) => void;
  user: IUser | undefined | null;
  // location: ILocation | undefined | null;
};

export type AppContextActionProps = {
  type: string;
  payload: object;
};

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

export const AppContext = createContext<Partial<AppContextStateProps>>({});
