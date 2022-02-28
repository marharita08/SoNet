import React, {useContext, useState} from "react";
import ReactLoading from 'react-loading';

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import EditProfileContainer from '../editProfile'
import {useParams} from "react-router-dom";

import { useQuery} from "react-query";
import {getUser} from "../api/usersCrud";

import OutgoingRequests from "../outgoingRequests";
import authContext from "../../context/authContext";
import Friends from "../friends";
import IncomingRequests from "../incomingRequests";

export function ProfileContainer() {
    let {id} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const {user:currentUser} = useContext(authContext);
    const {isFetching: userFetching, data: userData} = useQuery('user', () => getUser(id));

    let users = userData?.data;

    const handleClick = () => {
      setOpenModal(true);
    }

    return (
        <>
            {userFetching  && <ReactLoading type={'balls'} color='#001a4d'/>}
            {users?.map((user) =>
                <div key={user.user_id}>
                    <ErrorBoundary>
                        <Profile
                            user={user}
                            handleClick={handleClick}
                            isCurrentUser={user.user_id === currentUser.user_id}
                        />
                    </ErrorBoundary>
                    <EditProfileContainer
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        user={user}
                    />
                    {
                        user.user_id === currentUser.user_id &&
                        <div>
                            <Friends id={id}/>
                            <IncomingRequests id={id}/>
                            <OutgoingRequests id={id}/>
                        </div>
                    }
                </div>
            )}
        </>
    );
}
