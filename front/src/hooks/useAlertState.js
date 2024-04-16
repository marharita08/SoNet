import {useState} from "react";
import {initAlertState} from "../config/initValues";

export const useAlertState = () => {

  const [alertState, setAlertState] = useState(initAlertState);

  const handleAlertClose = () => {
    setAlertState(initAlertState);
  };

  const handleError = (err) => {
    setAlertState({
      message: err.response.data.message,
      severity: "error"
    });
  };

  const handleSuccess = (res) => {
    setAlertState({
      message: res.data.message,
      severity: "success"
    });
  };

  const showErrorAlert = (message) => {
    setAlertState({
      message,
      severity: "error"
    });
  };

  const showSuccessAlert = (message) => {
    setAlertState({
      message,
      severity: "success"
    });
  };

  return {alertState, handleError, handleSuccess, showSuccessAlert, showErrorAlert, handleAlertClose}
};
