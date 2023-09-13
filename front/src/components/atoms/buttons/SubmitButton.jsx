import React from "react";
import {Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import ProgressOrComponent from "../progressOrComponent/ProgressOrComponent";

const SubmitButton = ({isLoading, isAdd}) => {
    return (
        <Button
            type={"submit"}
            variant={"contained"}
            disabled={isLoading}
            startIcon={
                <ProgressOrComponent
                    isProgress={isLoading}
                    component={<SaveIcon/>}
                />
            }
        >
            {isAdd ? "Add" : "Save"}
        </Button>
    );
};

SubmitButton.propTypes = {
    isLoading: PropTypes.bool,
    isAdd: PropTypes.bool
};

SubmitButton.defaultProps = {
    isLoading: false,
    isAdd: false
};

export default SubmitButton;
