import {Box, Collapse, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import PropTypes from "prop-types";

const AlertComponent = ({message, handleClose, severity}) => {

    return (
        <Box sx={{ margin:"5px", padding:"5px"}}>
            <Collapse in={message !== undefined && message !== 'undefined'}>
            <Alert
                severity={severity}
                variant="outlined"
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
            </Collapse>
        </Box>

    )
}

AlertComponent.propTypes = {
    message: PropTypes.string,
    handleClose: PropTypes.func,
    severity: PropTypes.string
}

export default AlertComponent;
