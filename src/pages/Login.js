import { Card, Col, Row } from 'antd';
import { LoginForm } from 'forms';
import React from 'react';

const Login = function () {
  return (
    <Row justify="space-around" align="middle">
      <Col span={8}>
        <div style={{ marginTop: '25px' }}>
          <p>Test login credentials for Admin</p>
          <p>
            <strong>Name:</strong> Admin
          </p>
          <p>
            <strong>Password:</strong> Admin
          </p>
          <p>Test login credentials for Non Admin</p>
          <p>
            <strong>Name:</strong> MyName
          </p>
          <p>
            <strong>Password:</strong> test
          </p>
        </div>
      </Col>
      <Col span={7} className="center">
        <Card>
          <h2 className="center">Login</h2>
          <LoginForm />
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};

export default Login;
