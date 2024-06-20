import { ActionType, Actions } from "../actions/actions";
import { IItem } from "../models/IItem";

const itemReducer = (state: IItem[], action: Actions): IItem[] => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      return [...state, action.payload];

    case ActionType.EDIT_ITEM:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case ActionType.DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export default itemReducer;
