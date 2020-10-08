export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  username?: string;
  googleId: string;
  facebookId: string;
  companyResponses: ICompanyReponse[];
  confirmToken: string;
  isProfilePublic: Boolean;
  isActive: Boolean;
  dob?: Date;
  city?: string;
  state?: string;
  gender?: string;
}
export interface ICompanyReponse {
  id: string;
  companyId: string;
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

export interface ICategory {
  name: string;
  logoUrl: string;
}

export interface IPoliticalContributions {
  id: string;
  cycle: number;
  orgId: string;
  subsidiaryId: string;
  subsidiary: string;
  total: number;
  indivs: number;
  pacs: number;
  democrats: number;
  republicans: number;
  thirdParty: number;
}
export interface IParentCompany {
  name: string;
  orgId: string;
  politicalContributions?: IPoliticalContributions[];
}
export interface ICompany {
  id: string;
  name: string;
  brandUrl?: string;
  brandLogoUrl?: string;
  parentCompanies?: IParentCompany[];
  productTypes?: IProductType[];
  categories?: IProductType[];
}
