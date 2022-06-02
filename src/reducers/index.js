import { combineReducers } from "redux";
import userReducer from "./userReducer";
import clientsReducer from "./clientsReducer";
import interestReducer from "./interestReducer";

export default combineReducers({
  user: userReducer,
  clients: clientsReducer,
  interest: interestReducer,
});
