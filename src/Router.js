import { Layout } from 'antd';
import { AuthRoute, Header, PrivateRoute } from 'components/common';
import * as Pages from 'pages';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const { Content } = Layout;

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '25px' }}>
          <Switch>
            {/* Unauth routes start here */}
            <AuthRoute exact path={['/', '/login']}>
              <Pages.Login />
            </AuthRoute>
            {/* Unauth routes ends here */}
            {/* authenticated pages starts */}
            <PrivateRoute path="/dashboard">
              <Pages.Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/eslint">
              <Pages.Eslint />
            </PrivateRoute>
            {/* authenticated pages ends */}
            <Route path="*">
              <Pages.NotFound />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
