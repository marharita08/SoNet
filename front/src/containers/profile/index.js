import React, {useContext, useState} from "react";
import ReactLoading from 'react-loading';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import EditProfileContainer from '../editProfile'
import {getUser} from "../../api/usersCrud";
import OutgoingRequests from "../outgoingRequests";
import authContext from "../../context/authContext";
import Friends from "../friends";
import IncomingRequests from "../incomingRequests";
import {acceptRequest, declineRequest, deleteRequest, getStatus, insertRequest} from "../../api/friendsCrud";
import SearchUsersContainer from "../searchUsers";

const ProfileContainer = () => {
    let {id} = useParams();
    id = parseInt(id, 10);
    const [openModal, setOpenModal] = useState(false);
    const {user:currentUser, isAdmin} = useContext(authContext);
    const {isFetching: userFetching, data: userData} = useQuery('user', () => getUser(id));
    const {data: statusData} = useQuery('status',
            () => getStatus({'user_id': id, 'current_user_id': currentUser.user_id}));

    const status = statusData?.data;
    let users = userData?.data;

    const handleClick = () => {
      setOpenModal(true);
    }

    const { mutate: addMutate, isLoading: addLoading } = useMutation(insertRequest);
    const { mutate: acceptMutate, isLoading: acceptLoading } = useMutation(acceptRequest);
    const { mutate: declineMutate } = useMutation(declineRequest);
    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(deleteRequest);

    const addToFriends = () => {
        addMutate({
                from_user_id: currentUser.user_id,
                to_user_id: id
            });
    }

    const accept = () => {
        acceptMutate({
            to_user_id: currentUser.user_id,
            from_user_id: id
        });
    }

    const deleteFromFriends = () => {
        deleteMutate({
            current_user_id: currentUser.user_id,
            user_id: id
        });
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
                            addToFriends={addToFriends}
                            accept={accept}
                            deleteFromFriends={deleteFromFriends}
                            isFriends={status === 'friends'}
                            isNotFriends={status === 'not friends'}
                            isIncomingRequest={status === 'incoming request'}
                            isOutgoingRequest={status === 'outgoing request'}
                            isLoading={acceptLoading||addLoading||deleteLoading}
                            isAdmin={isAdmin}
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
                            <div className={'margin'}>
                                <SearchUsersContainer
                                    addMutate={addMutate}
                                    acceptMutate={acceptMutate}
                                    deleteMutate={deleteMutate}
                                />
                            </div>
                            <Friends id={id} deleteMutate={deleteMutate}/>
                            <IncomingRequests id={id} acceptMutate={acceptMutate} declineMutate={declineMutate}/>
                            <OutgoingRequests id={id} deleteMutate={deleteMutate}/>
                        </div>
                    }
                </div>
            )}
        </>
    );
}

export default ProfileContainer;
