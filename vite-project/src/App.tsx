import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TimersPage from '../pages/Timer/TimersPage';
import AddTimerForm from '../shared/components/AddTimerForm';
import TimerDetail from '../shared/components/TimerDetail';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TimersPage />} />
        <Route path='/add' element={<AddTimerForm />} />
        <Route path='/timer/:id' element={<TimerDetail />} />
      </Routes>
    </>
  );
}

export default App;