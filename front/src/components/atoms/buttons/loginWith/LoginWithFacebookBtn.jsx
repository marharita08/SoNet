import React from "react";
import env from "../../../../config/envConfig";
import LoginWithButton from "./LoginWithButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import ProgressOrComponent from "../../progressOrComponent/ProgressOrComponent";
import {useStyles} from "./loginWithBtnsStyle";
import PropTypes from "prop-types";

const LoginWithFacebookBtn = ({callback, isLoading}) => {

  const classes = useStyles();

  return (
    <FacebookLogin
      appId={env.facebook.clientId}
      scope="public_profile"
      callback={callback}
      render={renderProps => (
        <LoginWithButton
          onClick={renderProps.onClick}
          text={"Login with Facebook"}
          icon={
            <ProgressOrComponent
              isProgress={isLoading}
              component={
                <FacebookIcon fontSize={"small"}/>
              }
            />
          }
          className={classes.facebookLogin}
        />
      )}
    />
  );
};

LoginWithFacebookBtn.propTypes = {
  callback: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

LoginWithFacebookBtn.defaultProps = {
  isLoading: false
};

export default LoginWithFacebookBtn;
