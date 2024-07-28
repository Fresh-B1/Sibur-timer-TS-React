import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TimersList from '../../shared/components/TimersList';
import './TimersPage.css';

function TimersPage(): JSX.Element {
  const [edit, setEdit] = useState(false);

  const onHandleSubmit = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <div className='container'>
      <div className='container_timers'>
        <div className='timers_title'>Таймеры</div>
        <div>
          <TimersList edit={edit} />
        </div>
        <Link to='/add'>
          <button>+</button>
        </Link>
        <button onClick={onHandleSubmit}>Править</button>
      </div>
    </div>
  );
}

export default TimersPage;
