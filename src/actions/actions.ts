import { IItem } from "../models/IItem";
import { ILoginUser } from "../models/ILoginUser";

export enum ActionType {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  SET_AUTH,
  SET_USER,
}

interface AddItem {
  type: ActionType.ADD_ITEM;
  payload: IItem;
}

interface EditItem {
  type: ActionType.EDIT_ITEM;
  payload: IItem;
}

interface DeleteItem {
  type: ActionType.DELETE_ITEM;
  payload: { id: string };
}

interface SetAuth {
  type: ActionType.SET_AUTH;
  payload: boolean;
}

interface SetUser {
  type: ActionType.SET_USER;
  payload: ILoginUser;
}

export type Actions = AddItem | EditItem | DeleteItem | SetAuth | SetUser;
