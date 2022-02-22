import React, {useState} from "react";
import ReactLoading from 'react-loading';

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useParams} from "react-router-dom";

import {useMutation, useQuery} from "react-query";
import {getUser, getUsers, updateUser, getFriends, getIncomingRequests, getOutgoingRequests} from "../api/usersCrud";

import {getUniversities} from "../api/universitiesCrud";
import {getFieldVisibilities} from "../api/visibilitiesCrud";
import Users from "../../components/users";
import {serialize} from "object-to-formdata";

export function ProfileContainer() {
    let {id} = useParams();
    const {isFetching: userFetching, data: userData} = useQuery('user', () => getUser(id));
    const {isFetching: universitiesFetching, data: universitiesData} = useQuery('universities', () => getUniversities());
    const {isFetching: visibilitiesFetching, data: visibilitiesData} = useQuery('visibilities', () => getFieldVisibilities());
    const {isFetching: friendsFetching, data: friendsData} = useQuery('friends', () => getFriends(id));
    const {isFetching: incomingRequestsFetching, data: incomingRequestsData} = useQuery('incoming-requests', () => getIncomingRequests(id));
    const {isFetching: outgoingRequestsFetching, data: outgoingRequestsData} = useQuery('outgoing-requests', () => getOutgoingRequests(id));
    let users = userData?.data;
    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;
    let friends = friendsData?.data;
    let incomingRequests = incomingRequestsData?.data;
    let outgoingRequests = outgoingRequestsData?.data;

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


    return (
        <>
            {(userFetching || universitiesFetching || visibilitiesFetching) && <ReactLoading type={'balls'} color='#001a4d'/>}

            {users?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <Profile
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
                    />
                </ErrorBoundary>
                )}
            <Users users={friends} header={'Friends'}/>
            {friendsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <Users users={incomingRequests} header={'Incoming requests'}/>
            {incomingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <Users users={outgoingRequests} header={'Outgoing requests'}/>
            {outgoingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
        </>
    );
}
