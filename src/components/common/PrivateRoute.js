import { useAuth } from 'hooks';
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import { redirectToLogin } from 'store';

function PrivateRoute({ children, ...rest }) {
	const userData = useAuth();

	if (userData && userData?.name) {
		return <Route {...rest}>{children}</Route>;
	}
	redirectToLogin();
	return false;
}

PrivateRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default PrivateRoute;
