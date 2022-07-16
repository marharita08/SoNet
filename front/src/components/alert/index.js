import {IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import PropTypes from "prop-types";

const AlertComponent = ({message, handleClose, severity}) => {

    return (
        <Snackbar
            open={message !== undefined && message !== 'undefined'}
            autoHideDuration={10000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
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
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

AlertComponent.propTypes = {
    message: PropTypes.string,
    handleClose: PropTypes.func,
    severity: PropTypes.string
}

export default AlertComponent;
