// Handles Authentication state
import {
  USER_LOGIN_START,
  USER_LOGIN_COMPLETE,
  USER_LOGOUT_START,
  USER_LOGOUT_COMPLETE
} from "../actions/authActions";

const initialState = {
  userLoggingIn: false,
  userLoggedIn: false,
  userLoggingOut: false,
  userLoggedOut: true,
  userData: {}
};

const Auth_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        userLoggingIn: true
      };
    case USER_LOGIN_COMPLETE:
      return {
        ...state,
        userLoggingIn: false,
        userLoggedIn: true,
        userData: action.payload
      };
    case USER_LOGOUT_START:
      return {
        ...state,
        userLoggingIn: true
      };
    case USER_LOGOUT_COMPLETE:
      return {
        ...state,
        userLoggingOut: false,
        userLoggedOut: true,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default Auth_Reducer;
