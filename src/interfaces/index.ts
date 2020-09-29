export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  googleId: string;
  facebookId: string;
  responses: ICompanyReponse[];
  confirmToken: string;
  isProfilePublic: Boolean;
  isActive: Boolean;
  dob: Date;
  city: string;
  state: string;
  gender: string;
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
}
export interface IProduct {
  name: string;
  brand?: ICompany;
  productType: IProductType;
  tags?: ITag[];
}

export interface ICompany {
  id: string;
  name: string;
  // parentCompanies?: ICompany[];
  brandUrl?: string;
}
