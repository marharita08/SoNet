import React from "react";
import SNCropper from "../../atoms/cropper/SNCropper";
import env from "../../../config/envConfig";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {Field} from "formik";
import SNTextarea from "../../atoms/fields/SNTextarea";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import {DialogContent} from "@mui/material";
import {useStyles} from "../../style";
import {addArticleContentPropTypes, addArticleContentDefaultProps} from "./addArticleContentPropTypes";
import PropTypes from "prop-types";

const AddArticleContent = ({
    image,
    article,
    setCropper,
    croppedImage,
    cropImage,
    deleteImage,
    handleChange,
    visibilitiesFetching,
    visibilities,
    setFieldValue
}) => {

    const classes = useStyles();

    const isCropper = !!((image || article?.image) && !croppedImage);
    const isImage = !!(image || croppedImage || article?.image);

    return (
        <DialogContent>
            <SNCropper
                image={image || `${env.apiUrl}${article?.image}`}
                setCropper={setCropper}
                isVisible={isCropper}
            />
            {
                croppedImage &&
                <img src={croppedImage} alt={"image"} className={classes.addArticleImg}/>
            }
            <ImageDialogActions
                isCropper={isCropper}
                isImage={isImage}
                cropImageOnClick={() => cropImage(setFieldValue)}
                deleteImageOnclick={() => deleteImage(setFieldValue)}
                addImageOnClick={handleChange}
            />
            <div className={classes.addArticleField}>
                <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea}/>
            </div>
            <div className={classes.addArticleField}>
                <ProgressOrComponent
                    isProgress={visibilitiesFetching}
                    component={
                        <Field
                            component={FormikAutocomplete}
                            name="visibility"
                            label={"Available to"}
                            options={visibilities}
                        />
                    }
                />
            </div>
        </DialogContent>
    );
};

AddArticleContent.propTypes = {
    ...addArticleContentPropTypes,
    setFieldValue: PropTypes.func.isRequired
};
AddArticleContent.defaultProps = addArticleContentDefaultProps;

export default AddArticleContent;
