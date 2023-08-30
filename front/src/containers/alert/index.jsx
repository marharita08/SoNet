import AlertComponent from "../../components/alert";
import PropTypes from "prop-types";

const AlertContainer = ({alertMessage, handleClose}) => {

    return (
        <AlertComponent message={alertMessage} handleClose={handleClose}/>
    )
}

AlertContainer.propTypes = {
    alertMessage: PropTypes.string,
    handleClose: PropTypes.func,
}

export default AlertContainer;
