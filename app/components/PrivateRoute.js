import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../utils/Auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.valid() ? <Component {...props} />
      : <Redirect to={{ pathname: "/?error=session_timout", error: "Please login"}}  />
  )} />
);
