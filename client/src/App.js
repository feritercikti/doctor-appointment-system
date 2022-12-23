import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Register from './pages/Register';
import 'remixicon/fonts/remixicon.css';
import Home from './pages/Home';
import ApplyasDoctor from './pages/ApplyasDoctor';
import Appointments from './pages/Appointments';

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/be-a-doctor' element={<ApplyasDoctor />} />
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
