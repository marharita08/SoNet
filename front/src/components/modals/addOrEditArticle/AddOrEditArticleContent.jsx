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
import {
  addOrEditArticleContentPropTypes,
  addOrEditArticleContentDefaultProps
} from "./addOrEditArticleContentPropTypes";
import PropTypes from "prop-types";

const AddOrEditArticleContent = ({
  image,
  article,
  setCropper,
  croppedImage,
  handleCropImage,
  handleDeleteImage,
  handleAddImage,
  isVisibilitiesFetching,
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
        cropImageOnClick={() => handleCropImage(setFieldValue)}
        deleteImageOnclick={() => handleDeleteImage(setFieldValue)}
        addImageOnClick={handleAddImage}
      />
      <div className={classes.addArticleField}>
        <Field label={"Article text"} name={"text"} type={"text"} component={SNTextarea}/>
      </div>
      <div className={classes.addArticleField}>
        <ProgressOrComponent
          isProgress={isVisibilitiesFetching}
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

AddOrEditArticleContent.propTypes = {
  ...addOrEditArticleContentPropTypes,
  setFieldValue: PropTypes.func.isRequired
};
AddOrEditArticleContent.defaultProps = addOrEditArticleContentDefaultProps;

export default AddOrEditArticleContent;
