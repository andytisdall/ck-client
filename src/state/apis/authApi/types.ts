export interface User {
  username: string;
  admin: boolean;
  active: boolean;
  salesforceId: string;
  id: string;
}

export type UsersState = Record<string, User>

export interface SignInArgs {
  username: string;
  password: string;
}
export interface SignInResponse {
  user: User;
  token: string;
}
export interface ContactInfo {
  firstName: string;
  lastName: string;
  volunteerAgreement: boolean;
  foodHandler: boolean;
  homeChefStatus: string;
}
export interface CreateUserArgs {
  username:string, password?:string, salesforceId?:string
}

export type EditUserArgs = CreateUserArgs & {userId: string, }