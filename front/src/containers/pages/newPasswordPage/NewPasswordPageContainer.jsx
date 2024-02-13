import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";

import handleResponseContext from "../../../context/handleResponseContext";
import {savePassword} from "../../../api/passwordCrud";
import NewPasswordPageComponent from "../../../components/pages/newPasswordPage/NewPasswordPageComponent";

const NewPasswordPageContainer = () => {

  const {token} = useParams();
  const initValues = {password: "", confirmPassword: ""};
  const {handleError, handleSuccess} = useContext(handleResponseContext);

  const {mutate, isLoading} = useMutation(
    savePassword,
    {
      onError: handleError,
      onSuccess: handleSuccess
    }
  );

  const onFormSubmit = (data) => {
    mutate({
      password: data.password,
      token
    });
  };

  return (
    <NewPasswordPageComponent
      onFormSubmit={onFormSubmit}
      initialValues={initValues}
      isLoading={isLoading}
    />
  );
};

export default NewPasswordPageContainer;
