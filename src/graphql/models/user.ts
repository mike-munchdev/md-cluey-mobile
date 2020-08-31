export interface IUser {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pushTokens: string[];
}
