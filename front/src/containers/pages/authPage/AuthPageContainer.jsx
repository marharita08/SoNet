import React, {useContext} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";

import AuthPageComponent from "../../../components/pages/authPage/AuthPageComponent";
import {googleAuth, facebookAuth, authCrud} from "../../../api/authCrud";
import handleResponseContext from "../../../context/handleResponseContext";
import {initialUser, getAuthContext} from "../../../config/initValues";

const AuthPageContainer = ({setAuthContext}) => {

  const {handleError, showErrorAlert} = useContext(handleResponseContext);

  const options = {
    onSuccess: (data) => {
      const {data: {user, accessToken, refreshToken}} = data;
      setAuthContext(getAuthContext(user, accessToken, refreshToken));
    },
    onError: handleError
  };

  const {mutate: googleAuthMutate, isLoading: isGoogleLoading} = useMutation(googleAuth, options);

  const {mutate: facebookAuthMutate, isLoading: isFacebookLoading} = useMutation(facebookAuth, options);

  const {mutate: authMutate, isLoading: isAuthLoading} = useMutation(authCrud, options);

  const onGoogleSuccess = (response) => {
    const token = response.accessToken;
    let data = {"access_token": token};
    googleAuthMutate(data);
  };

  const onGoogleFailure = (response) => {
    showErrorAlert(response.message);
  };

  const onFacebookResponse = (response) => {
    const token = response.accessToken;
    let data = {"access_token": token};
    facebookAuthMutate(data);
  };

  const onFormSubmit = (data) => {
    authMutate(data);
  };

  return (
    <AuthPageComponent
      actions={{onGoogleSuccess, onGoogleFailure, onFormSubmit, onFacebookResponse}}
      initialUser={initialUser}
      flags={{isAuthLoading, isGoogleLoading, isFacebookLoading}}
    />
  );
};

AuthPageContainer.propTypes = {
  setAuthContext: PropTypes.func.isRequired,
};

export default AuthPageContainer;
