import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";
import AddOrEditArticleComponent from "../../../components/modals/addOrEditArticle/AddOrEditArticleComponent";
import {getArticleVisibilities} from "../../../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../../../api/articlesCrud";
import articleContext from "../../../context/articleContext";
import {useNavigate, useLocation} from "react-router-dom";
import {articlesPropTypes} from "../../../propTypes/articlePropTypes";
import imageService from "../../../services/imageService";
import articlesService from "../../../services/articlesService";
import {refetchOff} from "../../../config/refetchOff";
import handleResponseContext from "../../../context/handleResponseContext";

const AddOrEditArticleContainer = ({setArticleContext, articles, setArticles}) => {

  const {handleError, showErrorAlert} = useContext(handleResponseContext);
  const {data, isFetching: isVisibilitiesFetching} = useQuery(
    "visibilities",
    () => getArticleVisibilities(),
    {
      ...refetchOff
    }
  );
  const visibilities = data?.data;

  const articleState = useContext(articleContext);
  const {article, isAdd} = articleState;

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();
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
    setCroppedImage(null);
    setImage(null);
  };

  const handleAddImage = e => {
    e.preventDefault();
    imageService.addImage(e.target.files[0], setImage, showErrorAlert);
  };

  const handleCropImage = (setFieldValue) => {
    imageService.cropImage(cropper, setCroppedImage, setImage, setFieldValue);
  };

  const handleDeleteImage = (setFieldValue) => {
    article.image = null;
    imageService.deleteImage(setImage, setCroppedImage, setFieldValue);
  };

  return (
    <AddOrEditArticleComponent
      visibilities={visibilities}
      handleFormSubmit={handleFormSubmit}
      handleModalClose={handleModalClose}
      isLoading={isUpdateLoading || isInsertLoading}
      article={article}
      isAdd={isAdd}
      image={image}
      setCropper={setCropper}
      handleDeleteImage={handleDeleteImage}
      croppedImage={croppedImage}
      handleCropImage={handleCropImage}
      handleAddImage={handleAddImage}
      isVisibilitiesFetching={isVisibilitiesFetching}
    />
  );
};

AddOrEditArticleContainer.propTypes = {
  setArticleContext: PropTypes.func.isRequired,
  articles: articlesPropTypes,
  setArticles: PropTypes.func.isRequired,
};

export default AddOrEditArticleContainer;
