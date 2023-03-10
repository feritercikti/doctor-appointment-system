import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { hideLoading, showLoading } from '../../redux/alertSlice';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        '/api/doctor/get-appointments-by-doctor-id',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/doctor/change-appointment-status',
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Patient',
      dataIndex: 'name',
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')}{' '}
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='flex '>
          {record.status === 'pending' && (
            <div className='flex gap-2'>
              <h1
                className='bg-green-900 text-white rounded p-1 cursor-pointer'
                onClick={() => changeAppointmentStatus(record, 'approved')}
              >
                Approve
              </h1>
              <h1
                className='bg-red-900 text-white rounded p-1 cursor-pointer'
                onClick={() => changeAppointmentStatus(record, 'rejected')}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className='mb-2 text-xl text-center'>Appointments</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
