import { toast } from "react-toastify";
import { loginUser } from "../../services/UserService";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REFRESH = "USER_REFRESH";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const loginUserRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    const response = await loginUser(email, password);

    if (response && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", email);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        data: { email, token: response.token },
      });
    } else {
      if (response && response.status === 400) {
        toast.error(response.error);
      }
      dispatch({ type: USER_LOGIN_FAIL, payload: response });
    }
  };
};
export const logoutUserRedux = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
  };
};

export const handleRefresh = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
