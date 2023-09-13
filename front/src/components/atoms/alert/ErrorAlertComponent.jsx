import React from "react";
import {IconButton, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const ErrorAlertComponent = ({message, handleClose}) => {

    return (
        <Snackbar
            open={(!!message) && message !== "undefined"}
            autoHideDuration={10000}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            onClose={handleClose}
        >
            <Alert
                severity="error"
                variant="filled"
                action={
                    handleClose &&
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

ErrorAlertComponent.propTypes = {
    message: PropTypes.string,
    handleClose: PropTypes.func
};

export default ErrorAlertComponent;
