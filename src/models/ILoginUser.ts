export interface ILoginUser {
  username: string;
  password: string;
  isAuthenticated: boolean;
}

export const initialLoginUser: ILoginUser = {
  username: "",
  password: "",
  isAuthenticated: false,
};
