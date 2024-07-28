import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import './TimerDetail.css';

const TimerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timer = useSelector((state: RootState) =>
    state.timers.timers.find((timer) => timer.id === Number(id))
  );

  useEffect(() => {
    if (timer && timer.status === 'start') {
      const interval = setInterval(() => {
        if (timer.seconds > 0) {
          dispatch({
            type: 'timer/tick',
            payload: {
              id: timer.id,
              minutes: timer.minutes,
              seconds: timer.seconds - 1,
            },
          });
        } else if (timer.minutes > 0) {
          dispatch({
            type: 'timer/tick',
            payload: { id: timer.id, minutes: timer.minutes - 1, seconds: 59 },
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, dispatch]);

  if (!timer) {
    return <div>Таймер не найден</div>;
  }

  const handleStartPause = () => {
    if (timer.status === 'start') {
      dispatch({
        type: 'timer/paused',
        payload: {
          id: timer.id,
          minutes: timer.minutes,
          seconds: timer.seconds,
        },
      });
    } else {
      dispatch({ type: 'timer/start', payload: { id: timer.id } });
    }
  };

  const handleDelete = () => {
    dispatch({ type: 'timer/delete', payload: { id: timer.id } });
    navigate('/');
  };

  return (
    <div className='container_detail'>
      <div className='container_timers_detail'>
        <Link className='link_to_timers' to='/'>
          Таймеры
        </Link>

        <div className='timer_display_detail'>
          <div className='progress-circle'>
            <div className='progress-circle-inner'><span> {`${timer.minutes}:${timer.seconds.toString().padStart(2, '0')}`}</span></div>
           
          </div>
        </div>

        <div className='btn_cancel-resume-pause'>
          <button className='btn_pause-resume' onClick={handleStartPause}>
            {timer.status === 'start' ? 'Пауза' : 'Возобновить'}
          </button>
          <button className='btn_cancel' onClick={handleDelete}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerDetail;
