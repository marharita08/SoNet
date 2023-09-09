import React from "react";
import {Box, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import PropTypes from "prop-types";
import {useStyles} from "./style";

const SearchField = ({isFetching, ...props}) => {

    const classes = useStyles();

    return (
        <Box className={classes.field}>
            <ProgressOrComponent
                isProgress={isFetching}
                component={
                    <SearchIcon className={classes.icon}/>
                }
            />
            <TextField
                {...props}
                variant={"standard"}
                label={"Search"}
            />
        </Box>
    );
};

SearchField.propTypes = {
    isFetching: PropTypes.bool
};

SearchField.defaultProps = {
    isFetching: false
};

export default SearchField;
