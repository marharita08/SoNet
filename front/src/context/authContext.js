import {createContext} from "react";

const authContext = createContext(
    {
        authenticated: false
    }
);

export default authContext;
