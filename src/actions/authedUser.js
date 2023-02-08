import { verifyLogin } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function loginUser({id, name}) {
  return {
    type: LOGIN_USER,
    id,
    name
  };
}

export function handleLogin({id, password}) {
  return (dispatch) => {
  
    dispatch(showLoading());
    return verifyLogin({id, password})
    .then(({name}) => {
      dispatch(loginUser({id, name}));
    })
    .catch((e) => {
      console.warn("Error in verifyLogin: ", e);
      alert("The was an error during login. Try again.");
    })
    .finally(() => {
      dispatch(hideLoading());
    });
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}