import React from "react";
import Cropper from "react-cropper";
import {useStyles} from "./style";
import PropTypes from "prop-types";

const SNCropper = ({image, setCropper}) => {
    const classes = useStyles();

    return (
        <Cropper
            src={image}
            zoomable={false}
            scalable={false}
            onInitialized={instance => setCropper(instance)}
            rotatable={false}
            viewMode={1}
            className={classes.cropper}
        />
    );
};

SNCropper.propTypes = {
    image: PropTypes.string,
    setCropper: PropTypes.func
}

export default SNCropper;
