import { combineReducers } from "redux";
import appSettings from "./appSettings";

const rootReducer = combineReducers({
  appSettings,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
