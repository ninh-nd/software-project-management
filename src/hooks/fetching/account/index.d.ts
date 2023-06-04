export interface ThirdParty {
  name: string;
  username: string;
  accessToken: string;
}
export interface Account {
  _id: string;
  username: string;
  email: string;
  thirdParty: ThirdParty[];
  role: "admin" | "manager" | "member";
  permission: string[];
}
export interface AccountUpdate {
  email: string;
  role: "manager" | "member";
}
export interface AccountRegister {
  username: string;
  email: string;
  confirmPassword: string;
  password: string;
}
