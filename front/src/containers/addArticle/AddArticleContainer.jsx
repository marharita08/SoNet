import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";
import AddArticleComponent from "../../components/layouts/addArticle/AddArticleComponent";
import {getArticleVisibilities} from "../../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../../api/articlesCrud";
import articleContext from "../../context/articleContext";
import {useNavigate, useLocation} from "react-router-dom";
import {articlesPropTypes} from "../../propTypes/articlePropTypes";
import imageService from "../../services/imageService";
import articlesService from "../../services/articlesService";

const AddArticleContainer = ({setArticleContext, articles, setArticles}) => {

    const {data, isFetching: isVisibilitiesFetching} = useQuery(
        "visibilities",
        () => getArticleVisibilities(),
        {
            refetchInterval: false,
            refetchOnWindowFocus: false
        }
    );
    const visibilities = data?.data;

    const articleState = useContext(articleContext);
    const {article, isAdd} = articleState;

    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const {mutate: updateMutate, isLoading: isUpdateLoading} = useMutation(updateArticle, {
        onSuccess: (data) => {
            setArticleContext({
                openModal: false,
            });
            setErrorMessage("");
            setArticles(articlesService.updateArticle(articles, data?.data));
        },
        onError: (err) => setErrorMessage(err.response.data.message)
    });

    const {mutate: insertMutate, isLoading: isInsertLoading} = useMutation(insertArticle, {
        onSuccess: (data) => {
            setArticleContext({
                openModal: false,
            });
            setErrorMessage("");
            if (location.pathname === "/articles") {
                setArticles(articlesService.addArticle(articles, data?.data));
            } else {
                navigate("/articles");
            }
        },
        onError: (err) => setErrorMessage(err.response.data.message)
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
        setErrorMessage(undefined);
    };

    const handleAddImage = e => {
        e.preventDefault();
        imageService.addImage(e.target.files[0], setImage, errorMessage, setErrorMessage);
    };

    const handleCropImage = (setFieldValue) => {
        imageService.cropImage(cropper, setCroppedImage, setImage, setFieldValue);
    };

    const handleDeleteImage = (setFieldValue) => {
        article.image = null;
        imageService.deleteImage(setImage, setCroppedImage, setFieldValue);
    };

    return (
        <AddArticleComponent
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
            errorMessage={errorMessage}
            isVisibilitiesFetching={isVisibilitiesFetching}
        />
    );
};

AddArticleContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    articles: articlesPropTypes,
    setArticles: PropTypes.func.isRequired,
};

export default AddArticleContainer;
