import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';

const DoctorForm = ({ onFinish, initialValues }) => {
  return (
    <div className='flex items-center  mx-6'>
      <Form
        layout='vertical'
        className='text-center'
        onFinish={onFinish}
        initialValues={{
          ...initialValues,
          ...(initialValues && {
            timings: [
              moment(initialValues?.timings[0], 'HH:mm'),
              moment(initialValues?.timings[1], 'HH:mm'),
            ],
          }),
        }}
      >
        <h1 className='my-3 '>Personal information</h1>
        <Row gutter={[16, 16]}>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='First Name'
              name='firstName'
              rules={[{ required: true }]}
            >
              <Input placeholder='First name' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Last Name'
              name='lastName'
              rules={[{ required: true }]}
            >
              <Input placeholder='Last name' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Phone Number'
              name='phoneNumber'
              rules={[{ required: true }]}
            >
              <Input placeholder='Phone Number' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Website'
              name='website'
              rules={[{ required: true }]}
            >
              <Input placeholder='Website' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Address'
              name='address'
              rules={[{ required: true }]}
            >
              <Input placeholder='Address' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Specialization'
              name='specialization'
              rules={[{ required: true }]}
            >
              <Input placeholder='Specialization' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Experience (Years)'
              name='experience'
              rules={[{ required: true }]}
            >
              <Input placeholder='Experience' type='number' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Fee per Consultation'
              name='feePerConsultation'
              rules={[{ required: true }]}
            >
              <Input placeholder='Fee per Consultation' />
            </Form.Item>
          </Col>
          <Col span={6} xs={20} sm={12} lg={6}>
            <Form.Item
              required
              label='Timings'
              name='timings'
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format='HH:mm' />
            </Form.Item>
          </Col>
        </Row>
        <div className='flex '>
          <Button
            htmlType='submit'
            className='bg-green-700 text-white font-bold '
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DoctorForm;
