import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clientsReducer from "./clientsReducer";

export default combineReducers({
  user: userReducer,
  clients: clientsReducer,
});
