import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";

import ErrorBoundary from "../../components/ErrorBoundary";
import AddArticle from '../../components/addArticle';
import {getArticleVisibilities} from "../../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../../api/articlesCrud";
import articleContext from "../../context/articleContext";

const AddArticleContainer = ({setArticleContext}) => {
    const { data } = useQuery('visibilities', () => getArticleVisibilities());
    const articleState = useContext(articleContext);
    const {article, addArticle} = articleState;
    const visibilities = data?.data;
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [message, setMessage] = useState();

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation(updateArticle);

    const { mutate: insertMutate, isLoading: insertLoading } = useMutation(insertArticle);

    const onFormSubmit = (data) => {
        let formData = serialize(data);
        if (addArticle) {
            insertMutate(formData);
        } else {
            updateMutate(formData);
        }
        setArticleContext({
            openModal: false,
        });
        setMessage(undefined);
    }

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

        if (file.type.match('image.*') && file.size < 10000000) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
            if (message) {
                setMessage(undefined);
            }
        } else {
            setMessage('Wrong file format or size!');
        }
    }

    const cropImage = (setFieldValue) => {
        if (typeof cropper !== 'undefined') {
            var img = cropper.getCroppedCanvas().toDataURL();
            setCroppedImage(img);
            setImage(null);
            fetch(img)
                .then(res => res.blob())
                .then(blob => {
                    setFieldValue("file", blob);
                })
        }
    }

    const deleteImage = (setFieldValue) => {
        article.image = null;
        setImage(null);
        setCroppedImage(null);
        setFieldValue("file", undefined);
    }

    return (
        <ErrorBoundary>
            <AddArticle
                visibilities={visibilities}
                onFormSubmit={onFormSubmit}
                handleClose={handleClose}
                loading={updateLoading||insertLoading}
                article={article}
                addArticle={addArticle}
                image={image}
                setCropper={setCropper}
                deleteImage={deleteImage}
                croppedImage={croppedImage}
                cropImage={cropImage}
                handleChange={handleChange}
                message={message}
            />
        </ErrorBoundary>
    );
}

AddArticleContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
}

export default AddArticleContainer;
