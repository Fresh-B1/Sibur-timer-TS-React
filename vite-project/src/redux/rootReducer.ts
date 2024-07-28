import { combineReducers } from "redux";
import timerReducer from "../features/Timer/timerReducer";

const rootReducer = combineReducers({
  timers: timerReducer,
});

export default rootReducer;
