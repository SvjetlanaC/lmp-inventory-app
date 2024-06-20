import { ReactNode, createContext, useReducer } from "react";
import React from "react";
import { ILoginUser, initialLoginUser } from "../models/ILoginUser";
import { Actions } from "../actions/actions";
import userReducer from "../reducers/UserReducer";

interface UserContextType {
  user: ILoginUser;
  dispatch: React.Dispatch<Actions>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = (
  props: any
) => {
  const [user, dispatch] = useReducer(userReducer, initialLoginUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
