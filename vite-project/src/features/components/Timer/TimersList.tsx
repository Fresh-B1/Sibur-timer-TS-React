import React from 'react';
import { useSelector } from 'react-redux';
import Timer from './Timer';
import { RootState } from '../../../redux/store';

const TimersList = ({ edit }: { edit: boolean }) => {
  const timers = useSelector((state: RootState) => state.timers.timers);

  return (
    <>
      {timers.map((timer) => (
        <Timer edit={edit} key={timer.id} id={timer.id} />
      ))}
    </>
  );
};

export default TimersList;