import ReactLoading from "react-loading";
import React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const SNLoading = ({isLoading}) => {

    const theme = useTheme();

    return (
        <>
            {
                isLoading &&
                <ReactLoading type={"balls"} color={theme.palette.primary.main}/>
            }
        </>
    );
};

SNLoading.propTypes = {
    isLoading: PropTypes.bool,
};

SNLoading.defaultProps = {
    isLoading: false,
};

export default SNLoading;
