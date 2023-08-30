import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";

import authContext from "../../context/authContext";

function AdminRoute() {
    const {isAdmin, authenticated} = useContext(authContext);

    if (!authenticated) {
        return <Navigate to="/auth" replace/>;
    }
    if (!isAdmin) {
        return <Navigate to={"/articles"} replace/>;
    }

    return <Outlet/>;
}

export default AdminRoute;
