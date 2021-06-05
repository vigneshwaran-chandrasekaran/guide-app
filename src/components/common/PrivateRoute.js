import { useAuth } from 'hooks';
import React from 'react';
import { Route } from 'react-router-dom';
import { redirectToLogin } from 'store';

function PrivateRoute({ children, location = {}, ...rest }) {
	const userData = useAuth();

	if (userData && userData?.name) {
		return <Route {...rest}>{children}</Route>;
	} else {
		redirectToLogin();
		return false;
	}
}

export default PrivateRoute;
