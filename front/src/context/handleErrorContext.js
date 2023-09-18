import {createContext} from "react";

const handleErrorContext = createContext({
    handleError: (err) => {}
});

export default handleErrorContext;
