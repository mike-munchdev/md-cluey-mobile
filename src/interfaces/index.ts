export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
