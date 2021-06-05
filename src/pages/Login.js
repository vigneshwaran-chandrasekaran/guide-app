import { Card, Col, Row } from 'antd';
import { LoginForm } from 'forms';
import React from 'react';

function Login() {
	return (
		<Row justify="space-around" align="middle">
			<Col span={8}></Col>
			<Col span={7} className="center">
				<Card>
					<h2 className="center">Login Form with redux</h2>
					<LoginForm />
				</Card>
				<div style={{ marginTop: '25px' }}>
					<p>Test login credentials</p>
					<p>
						<strong>Name:</strong> Admin
					</p>
					<p>
						<strong>Password:</strong> Admin
					</p>
				</div>
			</Col>
			<Col span={8}></Col>
		</Row>
	);
}

export default Login;
