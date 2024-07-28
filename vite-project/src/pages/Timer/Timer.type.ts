export type Timer = {
  id: number;
  minutes: number;
  seconds: number;
  status: 'start' | 'paused' | 'stopped';
  startMinutes: number;
  startSeconds: number;
};

export type TimerID = Pick<Timer, 'id'>;

