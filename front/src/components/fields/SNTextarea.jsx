import React from "react";
import {TextField} from "formik-mui";

const SNTextarea = ({...props}) => {
    return (
        <TextField {...props} multiline fullWidth minRows={4}/>
    )
}

export default SNTextarea;
