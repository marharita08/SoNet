import React from "react";
import {IconButton, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const SNAlert = ({message, handleClose, severity}) => {

    return (
        <Snackbar
            open={(!!message)}
            autoHideDuration={6000}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            onClose={handleClose}
        >
            <Alert
                severity={severity}
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

SNAlert.propTypes = {
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func,
    severity: PropTypes.string.isRequired
};

export default SNAlert;
