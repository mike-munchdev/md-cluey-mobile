export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  username?: string;
  googleId: string;
  facebookId: string;
  appleId: string;
  companyResponses: ICompanyReponse[];
  confirmToken: string;
  isProfilePublic: Boolean;
  isActive: Boolean;
  dob?: Date;
  city?: string;
  state?: string;
  gender?: string;
  mustResetPassword: Boolean;
}
export interface ICompanyReponse {
  id: string;
  company: ICompany;
  response: string;
}

export interface ILocation {
  name: string;
}

export interface ITag {
  name: string;
}
export interface IProductType {
  name: string;
  isActive: boolean;
}
export interface IProduct {
  name: string;
  brand?: ICompany;
  productType: IProductType;
  tags?: ITag[];
}

export interface ICategory {
  name: string;
  logoUrl: string;
  isActive: boolean;
}

export interface IPoliticalContribution {
  id: string;
  cycle: number;
  org_id: string;
  org_name: string;
  total: number;
  democrats: number;
  republicans: number;
  third_party: number;
  indivs: number;
  indivs_dems: number;
  indivs_repubs: number;
  indivs_third: number;
  pacs: number;
  pacs_dems: number;
  pacs_repubs: number;
  pacs_third: number;
}
export interface IParentCompany {
  name: string;
  orgId: string;
}
export interface ICompany {
  id: string;
  name: string;
  brandUrl?: string;
  brandLogoUrl?: string;
  parentCompanies?: IParentCompany[];
  productTypes?: IProductType[];
  categories?: IProductType[];
  politicalContributions?: IPoliticalContribution[];
  isActive: boolean;
}

export interface IFriend {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface IFriendship {
  id: string;
  requester: IFriend;
  recipient: IFriend;
  status: string;
}

export interface ISystemNotification {
  id: string;
  message: string;
  notificationType: string;
  linkId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
