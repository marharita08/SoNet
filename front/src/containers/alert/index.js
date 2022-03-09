import AlertComponent from "../../components/alert";
import PropTypes from "prop-types";

const AlertContainer = ({alertMessage, handleClose, alertSeverity}) => {

    return (
        <AlertComponent message={alertMessage} handleClose={handleClose} severity={alertSeverity}/>
    )
}

AlertContainer.propTypes = {
    message: PropTypes.string,
    handleClose: PropTypes.func,
    severity: PropTypes.string
}

export default AlertContainer;
