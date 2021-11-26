import { useAuth } from 'hooks';
import React from 'react';
import { Route } from 'react-router-dom';
import { redirectToLogin } from 'store';

const PrivateRoute = function ({ children, location = {}, ...rest }) {
  const userData = useAuth();

  if (userData && userData?.name) {
    return <Route {...rest}>{children}</Route>;
  }
  redirectToLogin();
  return false;
};

export default PrivateRoute;
