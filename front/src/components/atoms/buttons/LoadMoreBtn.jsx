import {Button} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import ProgressOrComponent from "../progressOrComponent/ProgressOrComponent";
import {useStyles} from "../../style";

const LoadMoreBtn = ({handleLoadMore, isLoading}) => {

  const classes = useStyles();

  return (
    <div className={classes.loadMoreBtn}>
      <Button
        onClick={handleLoadMore}
        startIcon={
          <ProgressOrComponent
            isProgress={isLoading}
            component={<ExpandMoreIcon/>}
          />
        }
        variant={"outlined"}
        disabled={isLoading}
      >
        Load more
      </Button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

LoadMoreBtn.defaultProps = {
  isLoading: false
};

export default LoadMoreBtn;
