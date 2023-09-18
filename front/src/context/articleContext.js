import {createContext} from "react";

const articleContext = createContext(
    {
        isModalOpen: false
    }
);

export default articleContext;
