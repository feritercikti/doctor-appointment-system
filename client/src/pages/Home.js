import { Col, Row } from 'antd';
import React, { useState } from 'react';
import Doctor from '../components/Doctor';
import Layout from '../components/Layout';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  return (
    <Layout>
      <Row>
        {doctors.map((doctor) => (
          <Col>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
