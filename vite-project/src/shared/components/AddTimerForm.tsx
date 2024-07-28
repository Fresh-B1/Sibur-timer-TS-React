import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

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

  return (
    <form onSubmit={onHandleSubmit}>
      <input
        type='number'
        value={minutes}
        onChange={(e) => setMinutes(+e.target.value)}
        min='0'
      />
      <input
        type='number'
        value={seconds}
        onChange={(e) => setSeconds(+e.target.value)}
        min='0'
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type='submit' disabled={minutes === 0 && seconds === 0}>
        Старт
      </button>
      <Link to='/'>
        <li>Отменить</li>
      </Link>
    </form>
  );
};

export default AddTimerForm;
