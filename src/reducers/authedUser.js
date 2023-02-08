import { LOGIN_USER, LOGOUT_USER } from "../actions/authedUser";

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      const { id, name } = action;
        return {
          id: name ? id : null,
          name,
          isValidLogin: name ? true : false,
        };
    case LOGOUT_USER: {
      return {
        id: null,
        name: null,
        isValidLogin: true,
      }
    }
    default:
      return state;
  }
}