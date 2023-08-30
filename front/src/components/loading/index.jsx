import ReactLoading from "react-loading";
import React from "react";
import PropTypes from "prop-types";

const Loading = ({align, isLoading}) => {
    return (
        <div align={align}>
            {
                isLoading &&
                <ReactLoading type={'balls'} color='#001a4d'/>
            }
        </div>
    )
}

Loading.propTypes = {
    isLoading: PropTypes.bool,
    align: PropTypes.string
}

Loading.defaultProps = {
    isLoading: false,
    align: 'center'
}

export default Loading;
