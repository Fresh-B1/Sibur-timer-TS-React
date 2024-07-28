import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TimersList from '../../features/components/Timer/TimersList';
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
        <div className='container_timers_head'>
          <button className='btn_timer_edit' onClick={onHandleSubmit}>
            {edit ? 'Готово' : 'Править'}
          </button>

          <Link to='/add'>
            <button className='timer_plus'>
              <img src='../../../public/img/plus.svg' alt='+' />
            </button>
          </Link>
        </div>
        <div className='timers_title'>Таймеры</div>
        <>
          <TimersList edit={edit} />
        </>
      </div>
    </div>
  );
}

export default TimersPage;
