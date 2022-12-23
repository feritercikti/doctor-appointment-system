import React from 'react';
import DoctorForm from '../components/DoctorForm';
import Layout from '../components/Layout';

const ApplyasDoctor = () => {
  const onFinish = () => {};
  return (
    <Layout>
      <h1 className='mb-2 text-xl text-center'>Apply as a Doctor</h1>
      <hr />

      <DoctorForm onFinish={onFinish} />
    </Layout>
  );
};

export default ApplyasDoctor;
