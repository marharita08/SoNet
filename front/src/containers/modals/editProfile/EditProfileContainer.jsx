import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {serialize} from "object-to-formdata";
import EditProfileComponent from "../../../components/modals/editProfile/EditProfileComponent";
import {getUniversities} from "../../../api/universitiesCrud";
import {getFieldVisibilities} from "../../../api/visibilitiesCrud";
import {updateUser} from "../../../api/usersCrud";
import {EditProfileContainerPropTypes} from "./editProfileContainerPropTypes";
import {refetchOff} from "../../../config/refetchOff";
import imageService from "../../../services/imageService";

const EditProfileContainer = ({isModalOpen, setIsModalOpen, user, setUser}) => {

    const {isFetching: isUniversitiesFetching, data: universitiesData} = useQuery(
        "universities",
        () => getUniversities(),
        {...refetchOff}
    );
    const {isFetching: isVisibilitiesFetching, data: visibilitiesData} = useQuery(
        "visibilities",
        () => getFieldVisibilities(),
        {...refetchOff}
    );

    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;

    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const {mutate, isLoading} = useMutation(
        updateUser, {
            onSuccess: (data) => {
                setUser(data.data);
                setIsModalOpen(false);
            },
            onError: (err) => setErrorMessage(err.response.data.message)
        }
    );

    const onFormSubmit = (data) => {
        let formData = serialize(data);
        mutate(formData);
    };

    const handleAddImage = e => {
        e.preventDefault();
        imageService.addImage(e.target.files[0], setImage, errorMessage, setErrorMessage);
    };

    const handleCropImage = (setFieldValue) => {
        imageService.cropImage(cropper, setCroppedImage, setImage, setFieldValue);
    };

    const handleDeleteImage = (setFieldValue) => {
        imageService.deleteImage(setImage, setCroppedImage, setFieldValue);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCroppedImage(null);
        setImage(null);
    };

    const handleAlertClose = () => {
        setErrorMessage(undefined);
    };

    return (
        <EditProfileComponent
            user={user}
            universities={universities}
            visibilities={visibilities}
            handleDeleteImage={handleDeleteImage}
            handleCropImage={handleCropImage}
            croppedImage={croppedImage}
            image={image}
            isLoading={isLoading}
            onFormSubmit={onFormSubmit}
            setCropper={setCropper}
            handleAddImage={handleAddImage}
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            isFetching={isUniversitiesFetching || isVisibilitiesFetching}
            errorMessage={errorMessage}
            handleAlertClose={handleAlertClose}
        />
    );
};

EditProfileContainer.propTypes = EditProfileContainerPropTypes;

export default EditProfileContainer;
