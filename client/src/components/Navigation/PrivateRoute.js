import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from '../Home';
import history from './history';
import useAuth from '../../auth';
export default function PrivateRoute({
  children,
  ...rest
}) {

  let {authenticated} = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authenticated) {
          return children;
        } else {
          alert('Please login firstly!');
          return <Redirect
            to={{
              pathname: "/signIn",
              state: { from: location }
            }}
          />
        }
      }

      }
    />
  );
}