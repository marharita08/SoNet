import React from "react";
import {Button, CircularProgress} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";

const SubmitButton = ({isLoading, isAdd}) => {
    return (
        <Button
            type={"submit"}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress color="inherit" size={25}/> : <SaveIcon/>}
        >
            {isAdd ? "Add" : "Save"}
        </Button>
    );
};

SubmitButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAdd: PropTypes.bool
};

SubmitButton.defaultProps = {
    isAdd: false
};

export default SubmitButton;
