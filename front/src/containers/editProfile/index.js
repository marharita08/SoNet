import React, {useState} from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import EditProfile from '../../components/editProfile';
import {useMutation, useQuery} from "react-query";
import {getUniversities} from "../api/universitiesCrud";
import {getFieldVisibilities} from "../api/visibilitiesCrud";
import {updateUser} from "../api/usersCrud";
import {serialize} from "object-to-formdata";

const EditProfileContainer = ({openModal, setOpenModal, user}) => {

    const {isFetching: universitiesFetching, data: universitiesData} = useQuery('universities', () => getUniversities());
    const {isFetching: visibilitiesFetching, data: visibilitiesData} = useQuery('visibilities', () => getFieldVisibilities());

    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;

    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();

    const { mutate, isLoading } = useMutation(
        updateUser, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: () => {
                alert("Updating was failed.");
            }
        });

    const onFormSubmit = (data) => {
        console.log(data);
        let formData=serialize(data);
        formData.append('fileDestination', 'avatar');
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
        setImage(null);
        setCroppedImage(null);
        setFieldValue("file", undefined);
    }

    const handleClose = () => {
        setOpenModal(false);
        setCroppedImage(null);
        setImage(null)
    };


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
            />
        </ErrorBoundary>
    );
}

export default EditProfileContainer;
