import { ActionType, Actions } from "../actions/actions";
import { ILoginUser } from "../models/ILoginUser";

const userReducer = (state: ILoginUser, action: Actions): ILoginUser => {
  switch (action.type) {
    case ActionType.SET_AUTH:
      return { ...state, isAuthenticated: action.payload };
    case ActionType.SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
