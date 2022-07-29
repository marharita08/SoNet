import React from "react";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";
import {Button, Card, CardHeader, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';

import env from "../../config/envConfig";

const AuthComponent = ({
    onGoogleSuccess,
    onGoogleFailure,
    onFormSubmit,
    initialUser,
    responseFacebook,
    googleLoading,
    facebookLoading,
    authLoading }) => {

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").min(8, "Password should contain more than 8 symbols"),
    })

    return (
        <div align={"center"} className={'margin'}>
            <Card sx={{width: '500px'}}>
                <CardHeader
                    title={'Login'}
                />
                <div>
                    <Formik
                        onSubmit={onFormSubmit}
                        validationSchema={schema}
                        initialValues={initialUser}
                    >
                        <Form>
                            <Field
                                component={TextField}
                                type={"email"}
                                name={"email"}
                                label={"Email"}
                                sx={{margin:'5px'}}
                            />
                            <br/>
                            <Field
                                component={TextField}
                                type={"password"}
                                name={"password"}
                                label={"Password"}
                                className={'margin'}
                                sx={{margin:'5px'}}
                            />
                            <br/>
                            <Button
                                variant="contained"
                                type="submit"
                                className={'margin'}
                                startIcon={
                                    authLoading ? (
                                        <CircularProgress color="inherit" size={25}/>
                                    ) : <LoginIcon/>
                                }
                            >
                                Log in
                            </Button>
                        </Form>
                    </Formik>
                </div>
                <br/>
                <GoogleLogin
                    clientId={env.google.clientId}
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure}
                    accessType="offline"
                    render={renderProps => (
                        <button onClick={renderProps.onClick} className={"google-login margin"}>
                            <div className={"inline"}>
                                {
                                    googleLoading ?
                                        <CircularProgress color="inherit" size={25}/> :
                                        <GoogleIcon fontSize={"small"}/>
                                }
                            </div>
                            <div className={"inline margin"}>
                                Login with Google
                            </div>
                        </button>
                    )}
                />
                <br/>
                <FacebookLogin
                    appId={env.facebook.clientId}
                    scope="public_profile"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    render={renderProps => (
                        <button onClick={renderProps.onClick} className={"facebook-login margin"}>
                            <div className={"inline"}>
                                {
                                    facebookLoading ?
                                        <CircularProgress color="inherit" size={25}/> :
                                        <FacebookIcon fontSize={"small"}/>
                                }
                            </div>
                            <div className={"inline margin"}>
                                Login with Facebook
                            </div>
                        </button>
                    )}
                />
                <br/>
            </Card>
        </div>
    )
}

AuthComponent.propTypes = {
    onGoogleSuccess: PropTypes.func.isRequired,
    onGoogleFailure: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    responseFacebook: PropTypes.func.isRequired,
    initialUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    googleLoading: PropTypes.bool,
    facebookLoading: PropTypes.bool,
    authLoading: PropTypes.bool
}

export default AuthComponent;
