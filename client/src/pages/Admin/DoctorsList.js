import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { hideLoading, showLoading } from '../../redux/alertSlice';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get('/api/admin/get-all-doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/admin/change-doctor-account-status',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <div>{moment(text).format('DD-MM-YYYY')}</div>,
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='flex'>
          {record.status === 'pending' && (
            <h1
              className='cursor-pointer bg-green-900 rounded text-white p-1'
              onClick={() => changeDoctorStatus(record, 'approved')}
            >
              Approve
            </h1>
          )}
          {record.status === 'approved' && (
            <h1
              className='font-bold cursor-pointer'
              onClick={() => changeDoctorStatus(record, 'blocked')}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className='mb-2 text-xl text-center'>Doctors</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default DoctorsList;
