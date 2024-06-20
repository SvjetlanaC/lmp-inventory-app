import { ReactNode, createContext, useReducer } from "react";
import React from "react";
import itemReducer from "../reducers/ItemReducer";
import { Actions } from "../actions/actions";
import { IItem } from "../models/IItem";

interface ItemsContextType {
  items: IItem[];
  dispatch: React.Dispatch<Actions>;
}

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemContextProvider: React.FC<ItemProviderProps> = (
  props: any
) => {
  const [items, dispatch] = useReducer(
    itemReducer,
    JSON.parse(localStorage.getItem("items") || "[]")
  );

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, dispatch }}>
      {props.children}
    </ItemsContext.Provider>
  );
};
