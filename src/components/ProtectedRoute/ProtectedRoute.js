import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, isLoggedIn, children, ...props }) {
  return (
    <Route path={path}>
      {!isLoggedIn && <Redirect to="/"/>}
      {children}
    </Route>
  );
}

export default ProtectedRoute;
