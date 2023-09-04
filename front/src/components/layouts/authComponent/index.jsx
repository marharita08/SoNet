import React from "react";
import {Card, CardHeader} from "@mui/material";
import PropTypes from "prop-types";
import LoginWithFacebookBtn from "../../atoms/buttons/loginWith/LoginWithFacebookBtn";
import LoginWithGoogleBtn from "../../atoms/buttons/loginWith/LoginWithGoogleBtn";
import {useStyles} from "../../style";
import LoginForm from "./LoginForm";
import {userAuthPropTypes} from "../../../propTypes/userPropTypes";

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

    const classes = useStyles();

    return (
        <Card className={classes.authCard}>
            <CardHeader title={"Login/Sign Up"}/>
            <LoginForm
                onFormSubmit={onFormSubmit}
                isLoading={authLoading}
                initialUser={initialUser}
            />
            <div className={classes.loginWithBtns}>
                <LoginWithGoogleBtn
                    onFailure={onGoogleFailure}
                    onSuccess={onGoogleSuccess}
                    isLoading={googleLoading}
                />
                <LoginWithFacebookBtn
                    callback={responseFacebook}
                    isLoading={facebookLoading}
                />
            </div>
        </Card>
    );
};

AuthComponent.propTypes = {
    onGoogleSuccess: PropTypes.func.isRequired,
    onGoogleFailure: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    responseFacebook: PropTypes.func.isRequired,
    initialUser: userAuthPropTypes.isRequired,
    googleLoading: PropTypes.bool,
    facebookLoading: PropTypes.bool,
    authLoading: PropTypes.bool
};

AuthComponent.defaultProps = {
    googleLoading: false,
    facebookLoading: false,
    authLoading: false
};

export default AuthComponent;
