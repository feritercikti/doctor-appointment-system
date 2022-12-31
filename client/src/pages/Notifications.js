import { Tabs } from 'antd';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { setUser } from '../redux/userSlice';

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/users/mark-all-notifications-as-seen',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };
  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/users/delete-all-notifications',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout>
      <h1 className='text-center text-xl'>Notifications</h1>
      <hr />
      <Tabs className='flex mx-4'>
        <Tabs.TabPane tab='Unseen' key={0}>
          <div className='flex justify-end'>
            <h1 className='mx-2 cursor-pointer' onClick={() => markAllAsSeen()}>
              {' '}
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification, idx) => (
            <div key={idx} className='card'>
              <div
                className='card-text'
                onClick={() => navigate(notification.onClikPath)}
              >
                {notification.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Seen' key={1}>
          <div className='flex justify-end'>
            <h1 className='mx-2  cursor-pointer' onClick={() => deleteAll()}>
              {' '}
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification, idx) => (
            <div
              key={idx}
              className='card'
              onClick={() => navigate(notification.onClikPath)}
            >
              <div className='card-text'>{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
