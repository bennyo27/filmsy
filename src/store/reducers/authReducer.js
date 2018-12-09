// Handles Authentication state
import { Auth } from "../../auth/auth";
import auth0 from "../../auth/auth";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_PROFILE,
  REMOVE_PROFILE,
  SET_DB_PROFILE,
  REMOVE_DB_PROFILE
} from "../actions/authActions";

const initialState = {
  auth: new Auth(),
  isAuthenticated: false,
  UserProfile: null,
  DBUserProfile: null
};

const Auth_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      };
    case GET_PROFILE:
      return {
        ...state,
        UserProfile: action.payload
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        UserProfile: null
      };
    case SET_DB_PROFILE:
      return {
        ...state,
        DBUserProfile: action.payload
      };
    case REMOVE_DB_PROFILE:
      return {
        ...state,
        DBUserProfile: null
      };
    default:
      return state;
  }
};

export default Auth_Reducer;
