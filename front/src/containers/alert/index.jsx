import ErrorAlert from "../../components/atoms/alert/ErrorAlert";
import PropTypes from "prop-types";

const AlertContainer = ({alertMessage, handleClose}) => {

    return (
        <ErrorAlert message={alertMessage} handleClose={handleClose}/>
    );
};

AlertContainer.propTypes = {
    alertMessage: PropTypes.string,
    handleClose: PropTypes.func,
};

export default AlertContainer;
