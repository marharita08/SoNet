import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";
import ErrorBoundary from "../../components/ErrorBoundary";
import AddArticle from "../../components/layouts/addArticle";
import {getArticleVisibilities} from "../../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../../api/articlesCrud";
import articleContext from "../../context/articleContext";
import {useNavigate, useLocation} from "react-router-dom";

const AddArticleContainer = ({setArticleContext, articles, setArticles}) => {

    const {data, isFetching: visibilitiesFetching} = useQuery("visibilities",
        () => getArticleVisibilities(), {
            refetchInterval: false,
            refetchOnWindowFocus: false
        });
    const articleState = useContext(articleContext);
    const {article, addArticle} = articleState;
    const visibilities = data?.data;
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const {mutate: updateMutate, isLoading: updateLoading} = useMutation(updateArticle, {
        onSuccess: (data) => {
            setArticleContext({
                openModal: false,
            });
            setMessage(undefined);
            const updatedArticle = data?.data;
            const newArticles = [...articles];
            const index = newArticles.findIndex((obj => obj.article_id === updatedArticle.article_id));
            newArticles[index] = updatedArticle;
            setArticles(newArticles);
        },
        onError: (err) => setMessage(err.response.data.message)
    });

    const {mutate: insertMutate, isLoading: insertLoading} = useMutation(insertArticle, {
        onSuccess: (data) => {
            setArticleContext({
                openModal: false,
            });
            setMessage(undefined);
            const newArticle = data?.data;
            if (location.pathname === "/articles") {
                let newArticles = [...articles, newArticle];
                newArticles.sort((a, b) => {
                    const aid = a.article_id, bid = b.article_id;
                    if (aid > bid) {
                        return -1;
                    }
                    if (aid < bid) {
                        return 1;
                    }
                    return 0;
                });
                setArticles(newArticles);
            } else {
                navigate("/articles");
            }
        },
        onError: (err) => setMessage(err.response.data.message)
    });

    const onFormSubmit = (data) => {
        let formData = serialize(data);
        if (addArticle) {
            insertMutate(formData);
        } else {
            updateMutate(formData);
        }
    };

    const handleClose = () => {
        setArticleContext({
            openModal: false,
        });
        setCroppedImage(null);
        setImage(null);
        setMessage(undefined);
    };

    const handleChange = e => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file.type.match("image.*") && file.size < 10000000) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            if (message) {
                setMessage(undefined);
            }
        } else {
            setMessage("Wrong file format or size!");
        }
    };

    const cropImage = (setFieldValue) => {
        if (typeof cropper !== "undefined") {
            var img = cropper.getCroppedCanvas().toDataURL();
            setCroppedImage(img);
            setImage(null);
            fetch(img)
                .then(res => res.blob())
                .then(blob => {
                    setFieldValue("file", blob);
                });
        }
    };

    const deleteImage = (setFieldValue) => {
        article.image = null;
        setImage(null);
        setCroppedImage(null);
        setFieldValue("file", undefined);
    };

    return (
        <ErrorBoundary>
            <AddArticle
                visibilities={visibilities}
                onFormSubmit={onFormSubmit}
                handleClose={handleClose}
                isLoading={updateLoading || insertLoading}
                article={article}
                addArticle={addArticle}
                image={image}
                setCropper={setCropper}
                deleteImage={deleteImage}
                croppedImage={croppedImage}
                cropImage={cropImage}
                handleChange={handleChange}
                message={message}
                visibilitiesFetching={visibilitiesFetching}
            />
        </ErrorBoundary>
    );
};

AddArticleContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            article_id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            text: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            image: PropTypes.string,
        })
    ),
    setArticles: PropTypes.func.isRequired,
};

export default AddArticleContainer;
