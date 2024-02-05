import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";

import authContext from "../../context/authContext";

function ProtectedRoute() {
  const {authenticated} = useContext(authContext);

  if (!authenticated) {
    return <Navigate to="/auth" replace/>;
  }

  return <Outlet/>;
}

export default ProtectedRoute;
