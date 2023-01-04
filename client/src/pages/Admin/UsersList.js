import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { hideLoading, showLoading } from '../../redux/alertSlice';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get('/api/admin/get-all-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <div>{moment(text).format('DD-MM-YYYY')}</div>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='flex'>
          <h1 className='text-black underline cursor-pointer'>Block</h1>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className='mb-2 text-xl text-center'>Users</h1>
      <hr />
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default UsersList;
