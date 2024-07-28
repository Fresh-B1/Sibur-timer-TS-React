import { combineReducers } from "redux";
import timerReducer from "../features/components/Timer/reducer/timerReducer";

const rootReducer = combineReducers({
  timers: timerReducer,
});

export default rootReducer;
