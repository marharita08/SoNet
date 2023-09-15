import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {serialize} from "object-to-formdata";
import ErrorBoundary from "../../../components/ErrorBoundary";
import EditProfile from "../../../components/modals/editProfile";
import {getUniversities} from "../../../api/universitiesCrud";
import {getFieldVisibilities} from "../../../api/visibilitiesCrud";
import {updateUser} from "../../../api/usersCrud";
import {EditProfileContainerPropTypes} from "./editProfileContainerPropTypes";
import {refetchOff} from "../../../config/refetchOff";
import imageService from "../../../services/imageService";

const EditProfileContainer = ({openModal, setOpenModal, user, setUser}) => {

    const {isFetching: universitiesFetching, data: universitiesData} =
        useQuery("universities", () => getUniversities(), {
            ...refetchOff
        });
    const {isFetching: visibilitiesFetching, data: visibilitiesData} =
        useQuery("visibilities", () => getFieldVisibilities(), {
            ...refetchOff
        });

    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;

    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [message, setMessage] = useState();

    const {mutate, isLoading} = useMutation(
        updateUser, {
            onSuccess: (data) => {
                setUser(data.data);
                setOpenModal(false);
            },
            onError: (err) => setMessage(err.response.data.message)
        });

    const onFormSubmit = (data) => {
        let formData = serialize(data);
        mutate(formData);
    };

    const handleChange = e => {
        e.preventDefault();
        imageService.addImage(e.target.files[0], setImage, message, setMessage);
    };

    const cropImage = (setFieldValue) => {
        imageService.cropImage(cropper, setCroppedImage, setImage, setFieldValue);
    };

    const deleteImage = (setFieldValue) => {
        imageService.deleteImage(setImage, setCroppedImage, setFieldValue);
    };

    const handleClose = () => {
        setOpenModal(false);
        setCroppedImage(null);
        setImage(null);
    };

    const handleAlertClose = () => {
        setMessage(undefined);
    };

    return (
        <ErrorBoundary>
            <EditProfile
                user={user}
                universities={universities}
                visibilities={visibilities}
                deleteImage={deleteImage}
                cropImage={cropImage}
                croppedImage={croppedImage}
                image={image}
                isLoading={isLoading}
                onFormSubmit={onFormSubmit}
                setCropper={setCropper}
                handleChange={handleChange}
                openModal={openModal}
                handleClose={handleClose}
                isFetching={universitiesFetching || visibilitiesFetching}
                message={message}
                handleAlertClose={handleAlertClose}
            />
        </ErrorBoundary>
    );
};

EditProfileContainer.propTypes = EditProfileContainerPropTypes;

export default EditProfileContainer;
