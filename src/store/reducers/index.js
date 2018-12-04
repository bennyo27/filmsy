import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import authReducer from "./authReducer";

export default combineReducers({ moviesReducer, authReducer });
