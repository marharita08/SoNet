import React from "react";
import {Card, CardHeader} from "@mui/material";
import PropTypes from "prop-types";

import LoginWithFacebookBtn from "../../atoms/buttons/loginWith/LoginWithFacebookBtn";
import LoginWithGoogleBtn from "../../atoms/buttons/loginWith/LoginWithGoogleBtn";
import {useStyles} from "../../style";
import LoginForm from "./LoginForm";
import {userAuthPropTypes} from "../../../propTypes/userPropTypes";

const AuthPageComponent = ({actions, initialUser, flags}) => {

  const {onGoogleSuccess, onGoogleFailure, onFormSubmit, onFacebookResponse} = actions;
  const {isGoogleLoading, isFacebookLoading, isAuthLoading} = flags;
  const classes = useStyles();

  return (
    <Card className={classes.authCard}>
      <CardHeader title={"Login/Sign Up"}/>
      <LoginForm
        onFormSubmit={onFormSubmit}
        isLoading={isAuthLoading}
        initialUser={initialUser}
      />
      <div className={classes.loginWithBtns}>
        <LoginWithGoogleBtn
          onFailure={onGoogleFailure}
          onSuccess={onGoogleSuccess}
          isLoading={isGoogleLoading}
        />
        <LoginWithFacebookBtn
          callback={onFacebookResponse}
          isLoading={isFacebookLoading}
        />
      </div>
    </Card>
  );
};

AuthPageComponent.propTypes = {
  actions: PropTypes.shape({
    onGoogleSuccess: PropTypes.func.isRequired,
    onGoogleFailure: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onFacebookResponse: PropTypes.func.isRequired,
  }).isRequired,
  flags: PropTypes.shape({
    isGoogleLoading: PropTypes.bool,
    isFacebookLoading: PropTypes.bool,
    isAuthLoading: PropTypes.bool
  }),
  initialUser: userAuthPropTypes.isRequired,
};

AuthPageComponent.defaultProps = {
  isGoogleLoading: false,
  isFacebookLoading: false,
  isAuthLoading: false
};

export default AuthPageComponent;
