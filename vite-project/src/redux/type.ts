import { Timer, TimerID } from '../pages/Timer/Timer.type';

export type Action =
  | { type: 'timer/load'; payload: Timer[] }
  | { type: 'timer/add'; payload: Timer }
  | { type: 'timer/start'; payload: TimerID }
  | { type: 'timer/tick'; payload: Timer }
  | { type: 'timer/paused'; payload: Timer }
  | { type: 'timer/delete'; payload: TimerID };

export type StateTimer = {
  timers: Timer[];
};
