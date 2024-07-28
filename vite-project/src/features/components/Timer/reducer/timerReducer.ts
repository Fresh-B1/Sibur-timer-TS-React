import { Timer } from '../../../../pages/Timer/Timer.type';
import { Action, StateTimer } from '../../../../redux/type';

const defaultTimers: Timer[] = [
  {
    id: 1,
    minutes: 5,
    seconds: 0,
    status: 'stopped',
    startMinutes: 5,
    startSeconds: 0,
  },
  {
    id: 2,
    minutes: 10,
    seconds: 0,
    status: 'stopped',
    startMinutes: 10,
    startSeconds: 0,
  },
  {
    id: 3,
    minutes: 2,
    seconds: 0,
    status: 'stopped',
    startMinutes: 2,
    startSeconds: 0,
  },
];

// const loadInitialTimers = (): Timer[] => {
//   localStorage.setItem('timers', JSON.stringify([]));
//   const savedTimers = localStorage.getItem('timers');
//   if (savedTimers.length > 2) {
//     return savedTimers;
//   } else {
//     localStorage.setItem('timers', JSON.stringify(defaultTimers));
//     return defaultTimers;
//   }
// };

const stateTimer: StateTimer = {
  timers: defaultTimers,
};

const saveToLocalStorage = (state: StateTimer) => {
  localStorage.setItem('timers', JSON.stringify(state.timers));
};

const timerReducer = (
  state: StateTimer = stateTimer,
  action: Action
): StateTimer => {
  let newState: StateTimer;
  switch (action.type) {
    case 'timer/load':
      newState = {
        ...state,
        timers: action.payload,
      };
      saveToLocalStorage(newState);
      return newState;

    case 'timer/add':
      newState = {
        ...state,
        timers: [...state.timers, action.payload],
      };
      saveToLocalStorage(newState);
      return newState;

    case 'timer/tick':
      newState = {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id
            ? {
                ...timer,
                minutes: action.payload.minutes,
                seconds: action.payload.seconds,
              }
            : timer
        ),
      };
      saveToLocalStorage(newState);
      return newState;

    case 'timer/start':
      newState = {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? { ...timer, status: 'start' } : timer
        ),
      };
      saveToLocalStorage(newState);
      return newState;

    case 'timer/paused':
      newState = {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id
            ? {
                ...timer,
                status: 'paused',
                minutes: action.payload.minutes,
                seconds: action.payload.seconds,
              }
            : timer
        ),
      };
      saveToLocalStorage(newState);
      return newState;

    case 'timer/delete':
      newState = {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload.id),
      };
      saveToLocalStorage(newState);
      return newState;

    default:
      return state;
  }
};

export default timerReducer;
