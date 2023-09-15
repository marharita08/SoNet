import React from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";
import AuthComponent from "../../../components/layouts/auth/AuthComponent";
import {googleAuth, facebookAuth, auth} from "../../../api/auth";

const AuthContainer = ({setAuthContext, handleError, setErrorMessage}) => {

    const options = {
        onSuccess: (data) => {
            const {data: {user, accessToken, refreshToken}} = data;
            setAuthContext({
                authenticated: true,
                user,
                isAdmin: user.role === "admin",
                accessToken,
                refreshToken
            });
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

    const initialUser = {
        email: "",
        password: ""
    };

    return (
        <AuthComponent
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

AuthContainer.propTypes = {
    setAuthContext: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
};

export default AuthContainer;
