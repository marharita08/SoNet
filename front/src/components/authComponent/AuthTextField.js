import React from "react";
import {TextField} from "formik-mui";

const AuthTextField = ({ ...props }) => {
    return (
        <div className={'auth-field'}>
            <TextField {...props} fullWidth />
        </div>
    );
};

export default AuthTextField;
