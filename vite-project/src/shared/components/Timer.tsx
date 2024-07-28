import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import './Timer.css';

const Timer = ({ id, edit }: { edit: boolean; id: number }) => {
  const dispatch = useDispatch();

  const timer = useSelector((state: RootState) =>
    state.timers.timers.find((timer) => timer.id === id)
  );

  useEffect(() => {
    let interval: number;

    if (timer && timer.status === 'start') {
      interval = setInterval(() => {
        if (timer.seconds > 0) {
          dispatch({
            type: 'timer/tick',
            payload: { id, minutes: timer.minutes, seconds: timer.seconds - 1 },
          });
        } else if (timer.minutes > 0) {
          dispatch({
            type: 'timer/tick',
            payload: { id, minutes: timer.minutes - 1, seconds: 59 },
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, dispatch, id]);

  if (!timer) return null;

  const onHandleStartPause = () => {
    if (timer.status === 'start') {
      dispatch({
        type: 'timer/paused',
        payload: { id, minutes: timer.minutes, seconds: timer.seconds },
      });
    } else {
      dispatch({ type: 'timer/start', payload: { id } });
    }
  };

  const onHandleDelete = () => {
    dispatch({ type: 'timer/delete', payload: { id } });
  };

  return (
    <div className='timer'>
      <div>
        <Link to={`/timer/${timer.id}`}>
          {`${timer.minutes}:${timer.seconds.toString().padStart(2, '0')}`}
        </Link>
        <div>{`${timer.startMinutes > 0 ? `${timer.startMinutes} мин` : ''} ${
          timer.startSeconds > 0 ? `${timer.startSeconds} сек` : ''
        }`}</div>
      </div>

      <button onClick={onHandleStartPause}>
        {timer.status === 'start' ? 'Пауза' : 'Старт'}
      </button>

      <div>{edit && <button onClick={onHandleDelete}>Удалить</button>}</div>
    </div>
  );
};

export default Timer;
