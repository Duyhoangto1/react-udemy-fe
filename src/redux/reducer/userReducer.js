import { isError } from "lodash";
import {
  FETCH_USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/UserAction";

const initialaccounttate = {
  account: { email: "", auth: null, token: "" },
  isLoading: false,
  isError: false,
};

function userReducer(state = initialaccounttate, action) {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return { ...state, account: action.payload, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          email: action.data.email,
          auth: true,
          token: action.data.token,
        },
        isLoading: false,
        isError: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        account: { email: "", auth: false, token: "" },
        isError: true,
        isLoading: false,
      };
    case USER_LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        account: { email: "", auth: false, token: "" },
      };
    }
    case USER_REFRESH: {
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
          token: localStorage.getItem("token"),
        },
        isLoading: false,
        isError: false,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
