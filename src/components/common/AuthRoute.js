import { useAuth } from 'hooks';
import PropTypes from 'prop-types';
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

AuthRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default AuthRoute;
