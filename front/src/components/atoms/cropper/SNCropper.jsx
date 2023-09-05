import React from "react";
import Cropper from "react-cropper";
import {useStyles} from "../../style";
import PropTypes from "prop-types";

const SNCropper = ({image, setCropper, isVisible}) => {

    const classes = useStyles();

    return (
        isVisible ?
            <Cropper
                src={image}
                zoomable={false}
                scalable={false}
                onInitialized={instance => setCropper(instance)}
                rotatable={false}
                viewMode={1}
                className={classes.margin}
            /> : null
    );
};

SNCropper.propTypes = {
    image: PropTypes.string,
    setCropper: PropTypes.func.isRequired,
    isVisible: PropTypes.bool
};

SNCropper.defaultProps = {
    image: undefined,
    isVisible: false
};

export default SNCropper;
