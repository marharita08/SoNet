import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";

import authContext from "../../context/authContext";

function GuestRoute() {
  const {authenticated} = useContext(authContext);

  if (authenticated) {
    return <Navigate to="/articles" replace/>;
  }

  return <Outlet/>;
}

export default GuestRoute;
