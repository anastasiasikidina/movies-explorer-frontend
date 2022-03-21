import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, redirectTo, isLoggedIn, children, ...props }) {
  return (
    <Route path={path}>
      {!isLoggedIn && <Redirect to={redirectTo}/>}
      {children}
    </Route>
  );
}

export default ProtectedRoute;
