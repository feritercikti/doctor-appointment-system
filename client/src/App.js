import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import 'remixicon/fonts/remixicon.css';
import Home from './pages/Home';
import ApplyasDoctor from './pages/ApplyasDoctor';
import Appointments from './pages/Appointments';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import UsersList from './pages/Admin/UsersList';
import DoctorsList from './pages/Admin/DoctorsList';
import Profile from './pages/Doctor/Profile';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import BookAppointment from './pages/BookAppointment';
import Notifications from './pages/Notifications';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className='flex justify-center items-center absolute top-1/2	left-1/2 -translate-x-2/4	-translate-y-80'>
          <Spinner />
        </div>
      )}
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/be-a-doctor'
          element={
            <ProtectedRoute>
              <ApplyasDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path='/appointments'
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/userslist'
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/doctorsList'
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/doctor/profile/:userId'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notifications'
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path='/doctor/appointments'
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path='/book-appointment/:doctorId'
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
