import React, {useContext} from "react";
import handleResponseContext from "../../../context/handleResponseContext";
import {useMutation} from "react-query";
import {resetPassword} from "../../../api/passwordCrud";
import ResetPasswordPageComponent from "../../../components/pages/resetPasswordPage/ResetPasswordPageComponent";

const ResetPasswordPageContainer = () => {

  const {handleError, handleSuccess} = useContext(handleResponseContext);
  const initialValues = {email: ""};

  const {mutate, isLoading} = useMutation(
    resetPassword,
    {
      onError: handleError,
      onSuccess: handleSuccess
    }
  );

  const onFormSubmit = (data) => {
    mutate(data);
  };

  return (
    <ResetPasswordPageComponent
      onFormSubmit={onFormSubmit}
      initialValues={initialValues}
      isLoading={isLoading}
    />
  );
};

export default ResetPasswordPageContainer;
