export type SignInType = {
  email: string;
  password: string;
};

export interface SignUpType extends SignInType {
  name: string;
}

export type UserInfoType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
};
