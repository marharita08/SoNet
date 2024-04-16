import React, {useContext} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";
import {useNavigate, useLocation} from "react-router-dom";

import AddOrEditArticleComponent from "../../../components/modals/addOrEditArticle/AddOrEditArticleComponent";
import {getArticleVisibilities} from "../../../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../../../api/articlesCrud";
import articleContext from "../../../context/articleContext";
import {articlesPropTypes} from "../../../propTypes/articlePropTypes";
import articlesService from "../../../services/articlesService";
import handleResponseContext from "../../../context/handleResponseContext";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";
import {useCropper} from "../../../hooks/useCropper";

const AddOrEditArticleContainer = ({setArticleContext, articles, setArticles}) => {

  const {handleError, showErrorAlert} = useContext(handleResponseContext);
  const {data: visibilities, isFetching: isVisibilitiesFetching} = useQueryWrapper(
    "visibilities", getArticleVisibilities,
  );

  const articleState = useContext(articleContext);
  const {article, isAdd} = articleState;

  const {image, croppedImage, setCropper, addImage, cropImage, deleteImage} = useCropper();
  const navigate = useNavigate();
  const location = useLocation();

  const {mutate: updateMutate, isLoading: isUpdateLoading} = useMutation(updateArticle, {
    onSuccess: (data) => {
      setArticleContext({
        openModal: false,
      });
      setArticles(articlesService.updateArticle(articles, data?.data));
    },
    onError: handleError
  });

  const {mutate: insertMutate, isLoading: isInsertLoading} = useMutation(insertArticle, {
    onSuccess: (data) => {
      setArticleContext({
        openModal: false,
      });
      if (location.pathname === "/articles") {
        setArticles(articlesService.addArticle(articles, data?.data));
      } else {
        navigate("/articles");
      }
    },
    onError: handleError
  });

  const handleFormSubmit = (data) => {
    let formData = serialize(data);
    if (isAdd) {
      insertMutate(formData);
    } else {
      updateMutate(formData);
    }
  };

  const handleModalClose = () => {
    setArticleContext({
      openModal: false,
    });
    deleteImage();
  };

  const handleAddImage = e => {
    e.preventDefault();
    addImage(e.target.files[0], (err) => showErrorAlert(err));
  };

  const handleCropImage = (setFieldValue) => {
    cropImage((result) => setFieldValue("file", result));
  };

  const handleDeleteImage = (setFieldValue) => {
    article.image = null;
    setFieldValue("file", undefined);
    deleteImage();
  };

  return (
    <AddOrEditArticleComponent
      visibilities={visibilities}
      article={article}
      image={image}
      croppedImage={croppedImage}
      actions={{handleFormSubmit, handleModalClose, setCropper, handleDeleteImage, handleCropImage, handleAddImage}}
      flags={{isAdd, isVisibilitiesFetching, isLoading: isUpdateLoading || isInsertLoading}}
    />
  );
};

AddOrEditArticleContainer.propTypes = {
  setArticleContext: PropTypes.func.isRequired,
  articles: articlesPropTypes,
  setArticles: PropTypes.func.isRequired,
};

export default AddOrEditArticleContainer;
