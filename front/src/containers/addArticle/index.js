import React, {useState} from "react";

import AddArticle from '../../components/addArticle';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useMutation, useQuery} from "react-query";
import {getArticleVisibilities} from "../api/visibilitiesCrud";
import {insertArticle, updateArticle} from "../api/articlesCrud";
import PropTypes from "prop-types";
import {serialize} from "object-to-formdata";

const AddArticleContainer = ({openModal, setOpenModal, article, addArticle}) => {
    const { data } = useQuery('visibilities', () => getArticleVisibilities());
    const visibilities = data?.data;
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
        updateArticle, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: () => {
                alert("Updating was failed.");
            }
        });

    const { mutate: insertMutate, isLoading: insertLoading } = useMutation(
        insertArticle, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: () => {
                alert("Adding was failed.");
            }
        });

    const onFormSubmit = (data) => {
        let formData=serialize(data);
        if (addArticle) {
            insertMutate(formData);
        } else {
            updateMutate(formData);
        }
        setOpenModal(false);
    }

    const handleClose = () => {
        setOpenModal(false);
        setCroppedImage(null);
        setImage(null)
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
        } else {
            console.error('Wrong file format or size!');
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
        article.image=null;
        setImage(null);
        setCroppedImage(null);
        setFieldValue("file", undefined);
    }

    return (
        <ErrorBoundary>
            <AddArticle
                visibilities={visibilities}
                openModal={openModal}
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
            />
        </ErrorBoundary>
    );
}

AddArticleContainer.propTypes = {
    openModal: PropTypes.bool.isRequired,
    setOpenModal: PropTypes.func.isRequired,
    article: PropTypes.shape({
        text: PropTypes.string.isRequired,
        visibility: PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        }),
    }),
    addArticle: PropTypes.bool.isRequired,
}

export default AddArticleContainer;
