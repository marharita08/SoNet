import React from "react";
import {useMutation} from "react-query";
import PropTypes from 'prop-types';

import AuthComponent from "../../components/authComponent";
import {googleAuth, facebookAuth, auth} from "../../api/auth";

const AuthContainer = ({setAuthContext}) => {

    const setAuthContextFunc = data => {
        const { data: {user, accessToken, refreshToken}} = data;
        setAuthContext({
            authenticated: true,
            user,
            isAdmin: user.role === 'admin',
            accessToken,
            refreshToken
        })
    }

    const { mutate: googleAuthMutate } = useMutation(
        googleAuth, {
            onSuccess: setAuthContextFunc
        });

    const { mutate: facebookAuthMutate } = useMutation(
        facebookAuth, {
            onSuccess: setAuthContextFunc
        });

    const { mutate: authMutate } = useMutation(
        auth, {
            onSuccess: setAuthContextFunc
        });

    const onGoogleSuccess = (response) => {
        const token = response.accessToken;
        let data = {'access_token': token};
        googleAuthMutate(data);
    }

    const onGoogleFailure = (response) => {
        window.location.reload();
        window.localStorage.setItem('alertMessage', response.message);
        window.localStorage.setItem('alertSeverity', 'error');
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
}

export default AuthContainer;
