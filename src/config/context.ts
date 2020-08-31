import React, { createContext } from 'react';
import { IUser, ILocation } from '../interfaces';

type AppContextProps = {
  setUser: (user: IUser) => {};
  user: IUser | undefined | null;
  location: ILocation | undefined | null;
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
  signUp: (message: string, navigation: any) => void;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AppContext = createContext<Partial<AppContextProps>>({});
