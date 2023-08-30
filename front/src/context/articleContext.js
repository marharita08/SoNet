import {createContext} from "react";

const articleContext = createContext(
    {
        openModal: false
    }
);

export default articleContext;
