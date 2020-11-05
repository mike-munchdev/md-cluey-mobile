import {
  ICompanyReponse,
  IFriendship,
  ISystemNotification,
  IUser,
} from '../interfaces';

export interface IAppStateProps {
  user: IUser | undefined | null;
  companyResponses: ICompanyReponse[] | undefined | null;
  friends: IFriendship[] | undefined | null;
  notifications: ISystemNotification[] | undefined | null;
  token: string | undefined | null;
  users: IUser[] | undefined | null;
  publicUsers: IUser[] | undefined | null;
  friend: IUser | undefined | null;
  friendship: IFriendship | undefined | null;
}

export const initialState: IAppStateProps = {
  user: null,
  companyResponses: [],
  friends: [],
  friendship: null,
  notifications: [],
  token: null,
  users: null,
  publicUsers: null,
  friend: null,
};

export const UPDATE_USER = 'UPDATE_USER';
export interface IUpdateUserAction {
  type: typeof UPDATE_USER;
  payload: IUser | null | undefined;
}

export const UPDATE_USERS = 'UPDATE_USERS';
export interface IUpdateUsersAction {
  type: typeof UPDATE_USERS;
  payload: IUser[] | null | undefined;
}

export const UPDATE_USER_COMPANY_RESPONSE = 'UPDATE_USER_COMPANY_RESPONSE';
export interface IUpdateUserCompanyResponseAction {
  type: typeof UPDATE_USER_COMPANY_RESPONSE;
  payload: ICompanyReponse;
}

export const UPDATE_USER_COMPANY_RESPONSES = 'UPDATE_USER_COMPANY_RESPONSES';
export interface IUpdateUserCompanyResponsesAction {
  type: typeof UPDATE_USER_COMPANY_RESPONSES;
  payload: ICompanyReponse[];
}

export const REQUEST_FRIEND = 'REQUEST_FRIEND';
export interface IRequestFriendAction {
  type: typeof REQUEST_FRIEND;
  payload: IFriendship;
}

export const ACCEPT_FRIEND = 'ACCEPT_FRIEND';
export interface IAcceptFriendAction {
  type: typeof ACCEPT_FRIEND;
  payload: IFriendship;
}

export const REJECT_FRIEND = 'REJECT_FRIEND';
export interface IRemoveFriendAction {
  type: typeof REJECT_FRIEND;
  payload: IFriendship;
}

export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';
export interface IUpdateUserTokenAction {
  type: typeof UPDATE_USER_TOKEN;
  payload: string | null | undefined;
}

export const UPDATE_PUBLIC_USERS = 'UPDATE_PUBLIC_USERS';
export interface IUpdatePublicUserAction {
  type: typeof UPDATE_PUBLIC_USERS;
  payload: IUser[] | null | undefined;
}

export const ADD_FRIEND = 'ADD_FRIEND';
export interface IAddFriendAction {
  type: typeof ADD_FRIEND;
  payload: IFriendship[] | null | undefined;
}

export const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
export interface IUpdateFriendsAction {
  type: typeof UPDATE_FRIENDS;
  payload: IFriendship[] | null | undefined;
}
export const UPDATE_FRIEND = 'UPDATE_FRIEND';
export interface IUpdateFriendAction {
  type: typeof UPDATE_FRIEND;
  payload: IUser | null | undefined;
}
export const UPDATE_FRIENDSHIP = 'UPDATE_FRIENDSHIP';
export interface IUpdateFriendshipAction {
  type: typeof UPDATE_FRIENDSHIP;
  payload: IFriendship | null | undefined;
}

export const appReducer = (
  state: IAppStateProps,
  action:
    | IAcceptFriendAction
    | IRemoveFriendAction
    | IRequestFriendAction
    | IUpdateUserCompanyResponseAction
    | IUpdateUserCompanyResponsesAction
    | IUpdateUserAction
    | IUpdateUserTokenAction
    | IUpdateUsersAction
    | IUpdatePublicUserAction
    | IUpdateFriendAction
    | IUpdateFriendsAction
    | IAddFriendAction
    | IUpdateFriendshipAction
): IAppStateProps => {
  // console.log('action', action);

  switch (action.type) {
    case 'ACCEPT_FRIEND':
      return {
        ...state,
        ...action.payload,
      };
    case 'REJECT_FRIEND':
      return {
        ...state,
        ...action.payload,
      };
    case 'REQUEST_FRIEND':
      return {
        ...state,
        ...action.payload,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'UPDATE_USER_COMPANY_RESPONSE':
      const responses = state.companyResponses?.filter(
        (r) => r.id === action.payload.id
      );
      // console.log('action.payload', action.payload);
      return {
        ...state,
        companyResponses: [...responses, action.payload],
      };
    case 'UPDATE_USER_COMPANY_RESPONSES':
      return {
        ...state,
        companyResponses: action.payload,
      };
    case 'UPDATE_USER_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'UPDATE_PUBLIC_USERS':
      return {
        ...state,
        publicUsers: action.payload,
      };
    case 'UPDATE_FRIENDS':
      return {
        ...state,
        friends: action.payload,
      };
    case 'ADD_FRIEND':
      console.log('ADD_FRIEND: action.payload', action.payload);
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case 'UPDATE_FRIEND':
      return {
        ...state,
        friend: action.payload,
      };
    case 'UPDATE_FRIENDSHIP':
      return {
        ...state,
        friendship: action.payload,
      };
    default:
      return state;
  }
};
