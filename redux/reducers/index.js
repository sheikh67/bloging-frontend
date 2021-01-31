import { combineReducers } from "redux";
import counterReducer from "./counter.reducer";

const rootReducer = combineReducers({
  counterState: counterReducer,
});

export default rootReducer;
