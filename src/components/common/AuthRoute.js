import { useAuth } from 'hooks';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function AuthRoute({ children, ...rest }) {
	const userData = useAuth();

	if (userData && userData?.name) {
		return (
			<Redirect
				to={{
					pathname: '/dashboard',
				}}
			/>
		);
	}
	return <Route {...rest}>{children}</Route>;
}

export default AuthRoute;
