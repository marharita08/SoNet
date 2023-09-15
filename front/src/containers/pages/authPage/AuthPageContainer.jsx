import React, {useContext} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";
import AuthPageComponent from "../../../components/pages/authPage/AuthPageComponent";
import {googleAuth, facebookAuth, auth} from "../../../api/auth";
import handleErrorContext from "../../../context/handleErrorContext";
import {initialUser, getAuthContext} from "../../../config/initValues";

const AuthPageContainer = ({setAuthContext, setErrorMessage}) => {

    const {handleError} = useContext(handleErrorContext);

    const options = {
        onSuccess: (data) => {
            const {data: {user, accessToken, refreshToken}} = data;
            setAuthContext(getAuthContext(user, accessToken, refreshToken));
        },
        onError: handleError
    };

    const {mutate: googleAuthMutate, isLoading: isGoogleLoading} = useMutation(googleAuth, options);

    const {mutate: facebookAuthMutate, isLoading: isFacebookLoading} = useMutation(facebookAuth, options);

    const {mutate: authMutate, isLoading: isAuthLoading} = useMutation(auth, options);

    const onGoogleSuccess = (response) => {
        const token = response.accessToken;
        let data = {"access_token": token};
        googleAuthMutate(data);
    };

    const onGoogleFailure = (response) => {
        setErrorMessage(response.message);
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
            onGoogleSuccess={onGoogleSuccess}
            onGoogleFailure={onGoogleFailure}
            onFormSubmit={onFormSubmit}
            initialUser={initialUser}
            onFacebookResponse={onFacebookResponse}
            isAuthLoading={isAuthLoading}
            isGoogleLoading={isGoogleLoading}
            isFacebookLoading={isFacebookLoading}
        />
    );
};

AuthPageContainer.propTypes = {
    setAuthContext: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
};

export default AuthPageContainer;
