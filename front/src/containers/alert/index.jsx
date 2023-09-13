import ErrorAlertComponent from "../../components/atoms/alert/ErrorAlertComponent";
import PropTypes from "prop-types";

const AlertContainer = ({alertMessage, handleClose}) => {

    return (
        <ErrorAlertComponent message={alertMessage} handleClose={handleClose}/>
    );
};

AlertContainer.propTypes = {
    alertMessage: PropTypes.string,
    handleClose: PropTypes.func,
};

export default AlertContainer;
