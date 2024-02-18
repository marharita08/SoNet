import React from "react";
import {DialogContent} from "@mui/material";
import {Field} from "formik";

import SNCropper from "../../atoms/cropper/SNCropper";
import env from "../../../config/envConfig";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import SNTextarea from "../../atoms/fields/SNTextarea";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import FormikAutocomplete from "../../atoms/fields/FormikAutocomplete";
import {useStyles} from "../../style";
import {
  addOrEditArticleContentPropTypes,
  addOrEditArticleContentDefaultProps
} from "./addOrEditArticleContentPropTypes";

const AddOrEditArticleContent = ({image, article, croppedImage, isVisibilitiesFetching, visibilities, actions}) => {

  const {setCropper, handleCropImage, handleDeleteImage, handleAddImage, setFieldValue} = actions
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
        flags={{isImage, isCropper}}
        actions={{
          addImageOnClick: handleAddImage,
          cropImageOnClick: () => handleCropImage(setFieldValue),
          deleteImageOnClick: () => handleDeleteImage(setFieldValue)
        }}
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

AddOrEditArticleContent.propTypes = addOrEditArticleContentPropTypes;
AddOrEditArticleContent.defaultProps = addOrEditArticleContentDefaultProps;

export default AddOrEditArticleContent;
