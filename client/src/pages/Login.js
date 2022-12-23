import { Button, Form, Input } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/users/login', values);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.data);
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
    <div className='h-screen flex items-center justify-center	bg-white'>
      <div className='w-[400px] p-5 bg-sky-200 rounded shadow-lg'>
        <div className='flex items-center justify-center my-2 '>
          <h1 className='font-bold max-w-max py-2 text-2xl'>Welcome back</h1>
        </div>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email' className='font-bold'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label='Password' name='password' className='font-bold'>
            <Input placeholder='Password' type='password' />
          </Form.Item>
          <div className='flex justify-between items-center px-8'>
            <Button
              className='my-2 font-bold bg-black	 text-white border-none'
              htmlType='submit'
            >
              LOGIN
            </Button>

            <Link to='/register' className='font-bold'>
              REGISTER
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
