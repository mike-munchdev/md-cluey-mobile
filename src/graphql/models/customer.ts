export interface ICustomer {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  phoneNumber?: string;
  addresses: [IAddress];
}

export interface IAddress {
  id: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  isDelivery: boolean;
}
