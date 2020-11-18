import {
  ICategory,
  ICompanyReponse,
  IFriendship,
  IProductType,
  ISystemNotification,
  IUser,
} from '../interfaces';

export interface IAppStateProps {
  user: IUser | undefined | null;
  companyResponses: ICompanyReponse[] | undefined | null;
  companyResponse: ICompanyReponse | undefined | null;
  friends: IFriendship[] | undefined | null;
  notifications: ISystemNotification[] | undefined | null;
  token: string | undefined | null;
  users: IUser[] | undefined | null;
  publicUsers: IUser[] | undefined | null;
  friend: IUser | undefined | null;
  friendship: IFriendship | undefined | null;
  categories: ICategory[] | undefined | null;
  productTypes: IProductType[] | undefined | null;
  alertVisible: boolean;
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
  categories: [],
  productTypes: [],
  companyResponse: null,
  alertVisible: false,
};

export const UPDATE_ALERT_VISIBLE = 'UPDATE_ALERT_VISIBLE';
export interface IUpdateAlertVisibleAction {
  type: typeof UPDATE_ALERT_VISIBLE;
  payload: boolean;
}

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
export interface IRejectFriendAction {
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

export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export interface IUpdateNotificationsAction {
  type: typeof UPDATE_NOTIFICATIONS;
  payload: ISystemNotification[] | null | undefined;
}

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export interface IUpdateCategoriesAction {
  type: typeof UPDATE_CATEGORIES;
  payload: ICategory[] | null | undefined;
}

export const UPDATE_PRODUCT_TYPES = 'UPDATE_PRODUCT_TYPES';
export interface IUpdateProductTypesAction {
  type: typeof UPDATE_PRODUCT_TYPES;
  payload: IProductType[] | null | undefined;
}

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export interface IRemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  payload: ISystemNotification | null | undefined;
}

export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export interface IUpdateNotificationAction {
  type: typeof UPDATE_NOTIFICATION;
  payload: ISystemNotification | null | undefined;
}

export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export interface IRemoveFriendAction {
  type: typeof REMOVE_FRIEND;
  payload: IFriendship;
}
export const REMOVE_COMPANY_RESPONSE = 'REMOVE_COMPANY_RESPONSE';
export interface IRemoveCompanyResponseAction {
  type: typeof REMOVE_COMPANY_RESPONSE;
  payload: ICompanyReponse;
}
export const SET_COMPANY_RESPONSE = 'SET_COMPANY_RESPONSE';
export interface ISetCompanyResponseAction {
  type: typeof SET_COMPANY_RESPONSE;
  payload: ICompanyReponse;
}

export const appReducer = (
  state: IAppStateProps,
  action:
    | IUpdateAlertVisibleAction
    | IAcceptFriendAction
    | IRejectFriendAction
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
    | IUpdateNotificationsAction
    | IUpdateCategoriesAction
    | IUpdateProductTypesAction
    | IRemoveNotificationAction
    | IUpdateNotificationAction
    | IRemoveFriendAction
    | IRemoveCompanyResponseAction
    | ISetCompanyResponseAction
): IAppStateProps => {
  switch (action.type) {
    case 'UPDATE_ALERT_VISIBLE':
      return {
        ...state,
        alertVisible: action.payload,
      };
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
    case 'SET_COMPANY_RESPONSE':
      return {
        ...state,
        companyResponse: action.payload,
      };
    case 'UPDATE_USER_COMPANY_RESPONSE':
      const responses = state.companyResponses?.filter(
        (r) => r.id !== action.payload.id
      );

      return {
        ...state,
        companyResponses: [...responses, action.payload],
      };
    case 'REMOVE_COMPANY_RESPONSE':
      const responsesWithDeletedRemoved = state.companyResponses?.filter(
        (r) => r.id !== action.payload.id
      );

      return {
        ...state,
        companyResponses: responsesWithDeletedRemoved,
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
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'REMOVE_NOTIFICATION':
      const notifications = state.notifications?.filter(
        (n) => n.id !== action.payload?.id
      );
      return {
        ...state,
        notifications,
      };
    case 'UPDATE_NOTIFICATION':
      const notificationsUpdateNotifications = state.notifications?.filter(
        (n) => n.id !== action.payload?.id
      );

      return {
        ...state,
        notifications: notificationsUpdateNotifications?.push(action.payload),
      };
    case 'REMOVE_FRIEND':
      const friendsWithoutFriend = state.friends?.filter(
        (f) => f.id !== action.payload?.id
      );

      return {
        ...state,
        friends: friendsWithoutFriend,
      };
    default:
      return state;
  }
};
