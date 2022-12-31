import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DoctorForm from '../components/DoctorForm';
import Layout from '../components/Layout';
import { hideLoading, showLoading } from '../redux/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyasDoctor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/users/apply-doctor-account',
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm'),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout>
      <h1 className='mb-2 text-xl text-center'>Doctor Account Form</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyasDoctor;
