import React from "react";
import env from "../../../../config/envConfig";
import LoginWithButton from "./LoginWithButton";
import GoogleIcon from "@mui/icons-material/Google";
import {GoogleLogin} from "react-google-login";
import ProgressOrComponent from "../../progressOrComponent/ProgressOrComponent";
import {useStyles} from "./loginWithBtnsStyle";
import PropTypes from "prop-types";

const LoginWithGoogleBtn = ({onSuccess, onFailure, isLoading}) => {

    const classes = useStyles();

    return (
        <GoogleLogin
            clientId={env.google.clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            accessType="offline"
            render={renderProps => (
                <LoginWithButton
                    onClick={renderProps.onClick}
                    text={"Login with Google"}
                    icon={
                        <ProgressOrComponent
                            isProgress={isLoading}
                            component={
                                <GoogleIcon fontSize={"small"}/>
                            }
                        />
                    }
                    className={classes.googleLogin}
                />
            )}
        />
    );
};

LoginWithGoogleBtn.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
}

LoginWithGoogleBtn.defaultProps = {
    isLoading: false
}

export default LoginWithGoogleBtn;
