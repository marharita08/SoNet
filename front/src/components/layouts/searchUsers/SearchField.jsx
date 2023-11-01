import React from "react";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import PropTypes from "prop-types";
import {useStyles} from "./style";
import CloseIcon from "@mui/icons-material/Close";

const SearchField = ({isFetching, cleanSearch, ...props}) => {

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
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={cleanSearch} edge="end">
                                <CloseIcon fontSize={"small"}/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

SearchField.propTypes = {
    isFetching: PropTypes.bool,
    cleanSearch: PropTypes.func.isRequired
};

SearchField.defaultProps = {
    isFetching: false
};

export default SearchField;
