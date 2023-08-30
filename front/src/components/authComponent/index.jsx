import React from "react";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {Button, Card, CardHeader, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import AuthTextField from "./AuthTextField";
import LoginWithButton from "./LoginWithButton";
import "./auth.css";
import env from "../../config/envConfig";

const AuthComponent = ({
    onGoogleSuccess,
    onGoogleFailure,
    onFormSubmit,
    initialUser,
    responseFacebook,
    googleLoading,
    facebookLoading,
    authLoading
}) => {

    const schema = Yup.object().shape({
        email: Yup.string().required("Email is required")
            .email("Email is invalid")
            .max(255, "Email should contain no more than 255 symbols"),
        password: Yup.string().required("Password is required").min(8, "Password should contain more than 8 symbols"),
    });

    return (
        <Card className={"auth-card"}>
            <CardHeader title={"Login/Sign Up"}/>
            <div className={"margin"}>
                <Formik
                    onSubmit={onFormSubmit}
                    validationSchema={schema}
                    initialValues={initialUser}
                >
                    <Form>
                        <Field
                            component={AuthTextField}
                            type={"email"}
                            name={"email"}
                            label={"Email"}
                        />
                        <Field
                            component={AuthTextField}
                            type={"password"}
                            name={"password"}
                            label={"Password"}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            startIcon={
                                authLoading ? <CircularProgress color="inherit" size={25}/> : <LoginIcon/>
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
                    <LoginWithButton
                        onClick={renderProps.onClick}
                        text={"Login with Google"}
                        icon={googleLoading ?
                            <CircularProgress color="inherit" size={25}/> :
                            <GoogleIcon fontSize={"small"}/>}
                        className={"google-login"}
                    />
                )}
            />
            <FacebookLogin
                appId={env.facebook.clientId}
                scope="public_profile"
                callback={responseFacebook}
                render={renderProps => (
                    <LoginWithButton
                        onClick={renderProps.onClick}
                        text={"Login with Facebook"}
                        icon={facebookLoading ?
                            <CircularProgress color="inherit" size={25}/> :
                            <FacebookIcon fontSize={"small"}/>}
                        className={"facebook-login"}/>
                )}
            />
            <br/>
        </Card>
    );
};

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
};

export default AuthComponent;
