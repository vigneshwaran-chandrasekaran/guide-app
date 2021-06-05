import { PoweroffOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useAuth } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userLogout } from 'store/userSlice';

const { Header } = Layout;

export function findUrlPathId(path) {
	switch (path) {
		case '/login':
			return '1';
		case '/dashboard':
			return '2';
		default:
			return '1';
	}
}

function HeaderCustom() {
	const userData = useAuth();
	const dispatch = useDispatch();
	const [key, setKey] = useState();
	const location = useLocation();

	useEffect(() => {
		const pathId = findUrlPathId(location?.pathname);
		setKey(pathId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.pathname, userData, userData?.name]);

	const handleLogout = () => {
		dispatch(userLogout());
	};

	if (userData && userData?.name) {
		return (
			<Header className="header">
				<Menu theme="dark" mode="horizontal" selectedKeys={key}>
					<Menu.Item key="2">
						<Link to="/dashboard" className="link">
							Dashboard
						</Link>
					</Menu.Item>
					<Menu.Item key="99" onClick={handleLogout} className="link">
						<PoweroffOutlined />
						Logout
					</Menu.Item>
				</Menu>
			</Header>
		);
	}

	return (
		<Header className="header">
			<Menu theme="dark" mode="horizontal" selectedKeys={key}>
				<Menu.Item key="1">
					<Link to="/login" className="link">
						Login
					</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
}

export default HeaderCustom;
