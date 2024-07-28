import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './AddTimeForm.css';

const AddTimerForm: React.FC = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (minutes === 0 && seconds === 0) {
      setError('Введите положительное количество минут или секунд');
      return;
    }

    const newTimer = {
      id: Date.now(),
      minutes,
      seconds,
      status: 'stopped',
      startMinutes: minutes,
      startSeconds: seconds,
    };

    dispatch({
      type: 'timer/add',
      payload: newTimer,
    });

    dispatch({
      type: 'timer/start',
      payload: { id: newTimer.id },
    });

    setMinutes(0);
    setSeconds(0);
    setError('');
    navigate(`/timer/${newTimer.id}`);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value >= 60) {
      setMinutes(minutes + 1);
      setSeconds(0);
    } else {
      setSeconds(value);
    }
  };

  return (
    <div className='container_addForm'>
      <div className='container_inner'>
        <Link className='link_to_timers' to='/'>
          Отменить
        </Link>

        <div className='timers_title'>Таймер</div>

        <form className='form_addForm' onSubmit={onHandleSubmit}>
          <input
            name='minutes'
            type='number'
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value)}
            min='0'
            max='60'
          />
          <label htmlFor='minutes'>мин</label>
          <input
            name='seconds'
            type='number'
            value={seconds}
            onChange={handleSecondsChange}
            min='0'
            max='60'
          />
          <label htmlFor='seconds'>сек</label>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button
            className='btn_start'
            disabled={minutes === 0 && seconds === 0}
          >
            Старт
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTimerForm;
