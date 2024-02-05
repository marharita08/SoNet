import {createContext} from "react";

const handleResponseContext = createContext({
  handleError: (err) => {
  },
  handleSuccess: (res) => {
  },
  showErrorAlert: (message) => {
  },
  showSuccessAlert: (message) => {
  },
});

export default handleResponseContext;
