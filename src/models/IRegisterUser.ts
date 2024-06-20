export interface IRegisterUser {
  username: string;
  password: string;
  email: string;
}

export const initialRegisterUser: IRegisterUser = {
  username: "",
  password: "",
  email: "",
};
