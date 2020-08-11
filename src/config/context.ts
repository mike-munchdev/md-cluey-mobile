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
  signIn: (token: string, application: any, location?: string) => void;
  signOut: () => void;
  signUp: (message: string) => void;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AppContext = createContext<Partial<AppContextProps>>({});
