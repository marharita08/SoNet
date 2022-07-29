import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {serialize} from "object-to-formdata";

import ErrorBoundary from "../../components/ErrorBoundary";
import EditProfile from '../../components/editProfile';
import {getUniversities} from "../../api/universitiesCrud";
import {getFieldVisibilities} from "../../api/visibilitiesCrud";
import {updateUser} from "../../api/usersCrud";
import {EditProfileContainerPropTypes} from "./editProfileContainerPropTypes";

const EditProfileContainer = ({openModal, setOpenModal, user, setUser}) => {

    const {isFetching: universitiesFetching, data: universitiesData} = useQuery('universities', () => getUniversities());
    const {isFetching: visibilitiesFetching, data: visibilitiesData} = useQuery('visibilities', () => getFieldVisibilities());

    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;

    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();
    const [message, setMessage] = useState();

    const { mutate, isLoading } = useMutation(
        updateUser, {
            onSuccess: (data) => {
                setUser(data.data);
                setOpenModal(false);
            },
            onError: (err) => setMessage(err.response.data.message)
        });

    const onFormSubmit = (data) => {
        let formData=serialize(data);
        mutate(formData);
    }

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
        setImage(null);
        setCroppedImage(null);
        setFieldValue("file", undefined);
    }

    const handleClose = () => {
        setOpenModal(false);
        setCroppedImage(null);
        setImage(null);
    };

    const handleAlertClose = () => {
        setMessage(undefined);
    }

    return(
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
                isFetching={universitiesFetching||visibilitiesFetching}
                message={message}
                handleAlertClose={handleAlertClose}
            />
        </ErrorBoundary>
    );
}

EditProfileContainer.propTypes = EditProfileContainerPropTypes;

export default EditProfileContainer;
