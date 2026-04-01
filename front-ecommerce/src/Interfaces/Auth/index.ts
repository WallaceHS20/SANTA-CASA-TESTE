export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export enum UserKeys {
  ID = "id",
  NAME = "name",
  EMAIL = "email",
  ROLE = "role",
  AVATAR = "avatar",
}

export interface IUser {
  [UserKeys.ID]: number;
  [UserKeys.NAME]: string;
  [UserKeys.EMAIL]: string;
  [UserKeys.ROLE]: UserRole;
  [UserKeys.AVATAR]: string;
}

export enum AuthParamsKeys {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface IAuthParams {
  [AuthParamsKeys.EMAIL]: string;
  [AuthParamsKeys.PASSWORD]: string;
}

export enum AuthResponseKeys {
  TOKEN = "token",
  USER = "user",
}

export interface IAuthResponse {
  [AuthResponseKeys.TOKEN]: string;
  [AuthResponseKeys.USER]: IUser;
}
