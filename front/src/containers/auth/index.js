import React from "react";
import {useMutation} from "react-query";
import PropTypes from 'prop-types';

import AuthComponent from "../../components/authComponent";
import {googleAuth, facebookAuth, auth} from "../../api/auth";

const AuthContainer = ({setAuthContext, handleError}) => {

    const options = {
        onSuccess: (data) => {
            const { data: {user, accessToken, refreshToken}} = data;
            setAuthContext({
                authenticated: true,
                user,
                isAdmin: user.role === 'admin',
                accessToken,
                refreshToken
            })
        },
        onError: handleError
    }

    const { mutate: googleAuthMutate } = useMutation(googleAuth, options);

    const { mutate: facebookAuthMutate } = useMutation(facebookAuth, options);

    const { mutate: authMutate } = useMutation(auth, options);

    const onGoogleSuccess = (response) => {
        const token = response.accessToken;
        let data = {'access_token': token};
        googleAuthMutate(data);
    }

    const onGoogleFailure = (response) => {
        setAlertMessage(response.message);
    }

    const responseFacebook = (response) => {
        const token = response.accessToken;
        let data = {'access_token': token};
        facebookAuthMutate(data);
    }

    const onFormSubmit = (data) => {
        authMutate(data);
    }

    const initialUser = {
        email:'',
        password:''
    }

    return (
        <AuthComponent
            onGoogleSuccess={onGoogleSuccess}
            onGoogleFailure={onGoogleFailure}
            onFormSubmit={onFormSubmit}
            initialUser={initialUser}
            responseFacebook={responseFacebook}
        />
    )
}

AuthContainer.propTypes = {
    setAuthContext: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
}

export default AuthContainer;
