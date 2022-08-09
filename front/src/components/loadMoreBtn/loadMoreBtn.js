import {Button, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

const LoadMoreBtn = ({handleLoadMore, loading}) => {
    return (
        <div align={'center'} className={'margin'}>
            <Button onClick={handleLoadMore}
                    startIcon={loading ? (
                        <CircularProgress color="inherit" size={25}/>
                    ) :<ExpandMoreIcon/>}
                    variant={"outlined"}>
                Load more
            </Button>
        </div>
    );
}

LoadMoreBtn.propTypes = {
    handleLoadMore: PropTypes.func.isRequired
}

export default LoadMoreBtn;
