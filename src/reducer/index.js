import { combineReducers } from "redux";
import authReducer from "./auth";
import roomReducer from "./room";

export default combineReducers({
  auth: authReducer,
  rooms: roomReducer
});
