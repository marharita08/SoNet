import React, {useContext, useState} from "react";
import ReactLoading from 'react-loading';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import EditProfileContainer from '../editProfile'
import {getUser} from "../../api/usersCrud";
import OutgoingRequests from "../outgoingRequests";
import authContext from "../../context/authContext";
import Friends from "../friends";
import IncomingRequests from "../incomingRequests";
import {updateRequest, deleteRequest, getRequest, insertRequest} from "../../api/friendsCrud";
import SearchUsersContainer from "../searchUsers";

const ProfileContainer = (handleError) => {
    let {id} = useParams();
    id = parseInt(id, 10);
    const {user:currentUser, isAdmin} = useContext(authContext);
    const status = {
        underConsideration: 1,
        accepted: 2,
        denied: 3
    }

    const [openModal, setOpenModal] = useState(false);
    const [friends, setFriends] = useState();
    const [incomingRequests, setIncomingRequests] = useState();
    const [outgoingRequests, setOutgoingRequests] = useState();
    const [currentRequest, setCurrentRequest] = useState();
    const [usersForSearch, setUsersForSearch] = useState();
    const [user, setUser] = useState();


    const {isFetching: userFetching} = useQuery('user', () => getUser(id), {
        onSuccess: (data) => setUser(data.data)
    });
    const {isFetching: requestFetching} = useQuery('request', () => getRequest(id), {
            onSuccess: (data) => setCurrentRequest(data?.data)
    });

    const handleEdit = () => {
      setOpenModal(true);
    }

    const { mutate: addMutate, isLoading: addLoading } = useMutation(insertRequest, {
        onSuccess: (data) => {
            const { data: {request}} = data;
            if (id !== currentUser.user_id) {
                setCurrentRequest({...request, is_outgoing_request: true})
            } else {
                setOutgoingRequests([...outgoingRequests, request]);
                let newUsersForSearch = [...usersForSearch];
                const index = newUsersForSearch.findIndex((obj => obj.user_id === request.user_id));
                newUsersForSearch[index].is_not_friends = false;
                newUsersForSearch[index].is_outgoing_request = true;
                newUsersForSearch[index].request_id = request.request_id;
                setUsersForSearch(newUsersForSearch);
            }
        },
        onError: handleError
    });
    const { mutate: acceptMutate, isLoading: acceptLoading } = useMutation(updateRequest, {
        onSuccess: (data) => {
            let { data: {id: request_id}} = data;
            request_id = parseInt(request_id, 10);
            if (id !== currentUser.user_id) {
                let newCurrentRequest = currentRequest;
                newCurrentRequest.is_friends = true;
                newCurrentRequest.is_incoming_request = false;
                setCurrentRequest(newCurrentRequest);
            } else {
                let newIncomingRequestsList = [...incomingRequests];
                const index = newIncomingRequestsList.findIndex((obj => obj.request_id === request_id));
                let newFriendsList = [...friends, newIncomingRequestsList[index]];
                newIncomingRequestsList.splice(index, 1);

                setFriends(newFriendsList);
                setIncomingRequests(newIncomingRequestsList);

                let newUsersForSearch = [...usersForSearch];
                const userIndex = newUsersForSearch.findIndex((obj => obj.request_id === request_id));
                newUsersForSearch[userIndex].is_incoming_request = false;
                newUsersForSearch[userIndex].is_friends = true;
                setUsersForSearch(newUsersForSearch);
            }
        },
        onError: handleError
    });
    const { mutate: declineMutate } = useMutation(updateRequest, {
        onSuccess: (data) => {
            const { data: {id: request_id}} = data;
            let newIncomingRequestsList = [...incomingRequests];
            const index = newIncomingRequestsList.findIndex((obj => obj.request_id === request_id));
            newIncomingRequestsList.splice(index, 1);
            setIncomingRequests(newIncomingRequestsList);
        },
        onError: handleError
    });
    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(deleteRequest, {
        onSuccess: (data) => {
            if (id !== currentUser.user_id) {
                setCurrentRequest({ is_not_friends: true });
            } else {
                const { data: {id: request_id}} = data;

                let newFriendsList = [...friends];
                const friendsIndex = newFriendsList.findIndex((obj => obj.request_id === request_id));
                newFriendsList.splice(friendsIndex, 1);
                setFriends(newFriendsList);

                let newOutgoingRequestsList = [...outgoingRequests];
                const outgoingRequestsIndex = newOutgoingRequestsList.findIndex((obj => obj.request_id === request_id));
                newOutgoingRequestsList.splice(outgoingRequestsIndex, 1);
                setOutgoingRequests(newOutgoingRequestsList);

                let newUsersForSearch = [...usersForSearch];
                const userIndex = newUsersForSearch.findIndex((obj => obj.request_id === request_id));
                newUsersForSearch[userIndex].is_outgoing_request = false;
                newUsersForSearch[userIndex].is_friends = false;
                newUsersForSearch[userIndex].is_not_friends = true;
                newUsersForSearch[userIndex].request_id = undefined;
                setUsersForSearch(newUsersForSearch);
            }
        },
        onError: handleError
    });

    const addToFriends = (fromUserId, toUserId) => {
        addMutate({
                from_user_id: fromUserId,
                to_user_id: toUserId
            });
    }

    const accept = (id) => {
        acceptMutate({
            request_id: id,
            status_id: status.accepted
        });
    }

    const decline = (id) => {
        declineMutate({
            request_id: id,
            status_id: status.denied
        })
    }

    const deleteFromFriends = (id) => {
        deleteMutate(id);
    }

    const handleAddToFriends = () => {
        addToFriends(currentUser.user_id, id)
    }

    const handleAccept = () => {
        accept(currentRequest.request_id);
    }

    const handleDeleteFromFriends = () => {
        deleteFromFriends(currentRequest.request_id);
    }

    return (
        <>
            {(userFetching || requestFetching) && <ReactLoading type={'balls'} color='#001a4d'/>}

                <div key={user?.user_id}>
                    <ErrorBoundary>
                        <Profile
                            user={user}
                            handleEdit={handleEdit}
                            isCurrentUser={user?.user_id === currentUser.user_id}
                            handleAddToFriends={handleAddToFriends}
                            handleAccept={handleAccept}
                            handleDeleteFromFriends={handleDeleteFromFriends}
                            currentRequest={currentRequest}
                            isLoading={acceptLoading||addLoading||deleteLoading}
                            isAdmin={isAdmin}
                        />
                    </ErrorBoundary>
                    <EditProfileContainer
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        user={user}
                        setUser={setUser}
                    />
                    {
                        user?.user_id === currentUser.user_id &&
                        <div>
                            <div className={'margin'}>
                                <ErrorBoundary>
                                <SearchUsersContainer
                                    accept={accept}
                                    addToFriends={addToFriends}
                                    deleteFromFriends={deleteFromFriends}
                                    usersForSearch={usersForSearch}
                                    setUsersForSearch={setUsersForSearch}
                                />
                                </ErrorBoundary>
                            </div>
                            <ErrorBoundary>
                            <Friends
                                id={id}
                                deleteRequest={deleteFromFriends}
                                friends={friends}
                                setFriends={setFriends}
                            />
                            </ErrorBoundary>
                            <ErrorBoundary>
                            <IncomingRequests
                                id={id}
                                accept={accept}
                                decline={decline}
                                incomingRequests={incomingRequests}
                                setIncomingRequests={setIncomingRequests}
                            />
                            </ErrorBoundary>
                            <ErrorBoundary>
                            <OutgoingRequests
                                id={id}
                                deleteRequest={deleteFromFriends}
                                outgoingRequests={outgoingRequests}
                                setOutgoingRequests={setOutgoingRequests}
                            />
                            </ErrorBoundary>
                        </div>
                    }
                </div>

        </>
    );
}

ProfileContainer.propTypes = {
    handleError: PropTypes.func.isRequired
};

export default ProfileContainer;
