import {Button} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LoadMoreBtn = ({handleLoadMore}) => {
    return (
        <div align={'center'} className={'margin'}>
            <Button onClick={handleLoadMore} startIcon={<ExpandMoreIcon/>} variant={"outlined"}>
                Load more
            </Button>
        </div>
    );
}

LoadMoreBtn.propTypes = {
    handleLoadMore: PropTypes.func.isRequired
}

export default LoadMoreBtn;
