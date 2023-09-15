import React, {useContext, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import ProfileComponent from "../../../components/layouts/profile/ProfileComponent";
import EditProfileContainer from "../../modals/editProfile";
import {getUser} from "../../../api/usersCrud";
import OutgoingRequestsContainer from "../../layouts/outgoingRequests/OutgoingRequestsContainer";
import authContext from "../../../context/authContext";
import FriendsContainer from "../../layouts/friends/FriendsContainer";
import IncomingRequestsContainer from "../../layouts/incomingRequests/IncomingRequestsContainer";
import {updateRequest, deleteRequest, getRequest, insertRequest} from "../../../api/friendsCrud";
import SearchUsersContainer from "../../layouts/searchUsers/SearchUsersContainer";
import {refetchOff} from "../../../config/refetchOff";
import handleErrorContext from "../../../context/handleErrorContext";
import ProfilePageComponent from "../../../components/pages/profilePage/ProfilePageComponent";
import usersForSearchService from "../../../services/usersForSearchService";
import requestsService from "../../../services/requestsService";

const ProfilePageContainer = () => {
    const {id: idStr} = useParams();
    const id = +idStr;
    const {user: currentUser, isAdmin} = useContext(authContext);
    const {handleError} = useContext(handleErrorContext);
    const status = {
        underConsideration: 1,
        accepted: 2,
        denied: 3
    };

    const [openModal, setOpenModal] = useState(false);
    const [friends, setFriends] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [usersForSearch, setUsersForSearch] = useState([]);
    const [user, setUser] = useState();


    const {isFetching: isUserFetching} = useQuery(
        `user ${id}`,
        () => getUser(id), {
            onSuccess: (data) => setUser(data.data),
            ...refetchOff
        }
    );
    const {isFetching: isRequestFetching} = useQuery(
        `request ${id}`,
        () => getRequest(id), {
            onSuccess: (data) => setCurrentRequest(data?.data),
            ...refetchOff
        }
    );

    const handleEdit = () => {
        setOpenModal(true);
    };

    const {mutate: addMutate, isLoading: isAddLoading} = useMutation(insertRequest, {
        onSuccess: (data) => {
            const {data: {request}} = data;
            if (id !== currentUser.user_id) {
                setCurrentRequest({...request, is_outgoing_request: true});
            } else {
                setOutgoingRequests(requestsService.addRequest(outgoingRequests, request));
                setUsersForSearch(usersForSearchService.addRequest(usersForSearch, request));
            }
        },
        onError: handleError
    });
    const {mutate: acceptMutate, isLoading: isAcceptLoading} = useMutation(updateRequest, {
        onSuccess: (data) => {
            let {data: {id: request_id}} = data;
            request_id = parseInt(request_id, 10);
            if (id !== currentUser.user_id) {
                let newCurrentRequest = currentRequest;
                newCurrentRequest.is_friends = true;
                newCurrentRequest.is_incoming_request = false;
                setCurrentRequest(newCurrentRequest);
            } else {
                const request = requestsService.getRequest(incomingRequests, request_id);
                setFriends(requestsService.addRequest(friends, request));
                setIncomingRequests(requestsService.deleteRequest(incomingRequests, request_id));
                setUsersForSearch(usersForSearchService.acceptRequest(usersForSearch, request_id));
            }
        },
        onError: handleError
    });
    const {mutate: declineMutate} = useMutation(updateRequest, {
        onSuccess: (data) => {
            const {data: {id: request_id}} = data;
            setIncomingRequests(requestsService.deleteRequest(incomingRequests, request_id));
        },
        onError: handleError
    });
    const {mutate: deleteMutate, isLoading: isDeleteLoading} = useMutation(deleteRequest, {
        onSuccess: (data) => {
            if (id !== currentUser.user_id) {
                setCurrentRequest({is_not_friends: true});
            } else {
                const {data: {id: request_id}} = data;
                setFriends(requestsService.deleteRequest(friends, request_id));
                setOutgoingRequests(requestsService.deleteRequest(outgoingRequests, request_id));
                setUsersForSearch(usersForSearchService.deleteRequest(usersForSearch, request_id));
            }
        },
        onError: handleError
    });

    const addToFriends = (fromUserId, toUserId) => {
        addMutate({
            from_user_id: fromUserId,
            to_user_id: toUserId
        });
    };

    const acceptRequest = (id) => {
        acceptMutate({
            request_id: id,
            status_id: status.accepted
        });
    };

    const declineRequest = (id) => {
        declineMutate({
            request_id: id,
            status_id: status.denied
        });
    };

    const deleteFromFriends = (id) => {
        deleteMutate(id);
    };

    const handleAddToFriends = () => {
        addToFriends(currentUser.user_id, id);
    };

    const handleAccept = () => {
        acceptRequest(currentRequest.request_id);
    };

    const handleDeleteFromFriends = () => {
        deleteFromFriends(currentRequest.request_id);
    };

    return (
        <ProfilePageComponent
            key={id}
            isCurrentUser={user?.user_id === currentUser.user_id}
            isLoading={isUserFetching}
            profileComponent={
                <ProfileComponent
                    user={user}
                    handleEdit={handleEdit}
                    isCurrentUser={user?.user_id === currentUser.user_id}
                    handleAddToFriends={handleAddToFriends}
                    handleAccept={handleAccept}
                    handleDeleteFromFriends={handleDeleteFromFriends}
                    currentRequest={currentRequest}
                    isLoading={isAcceptLoading || isAddLoading || isDeleteLoading}
                    isAdmin={isAdmin}
                    requestFetching={isRequestFetching}
                />
            }
            editProfileComponent={
                <EditProfileContainer
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    user={user}
                    setUser={setUser}
                />
            }
            searchUsersComponent={
                <SearchUsersContainer
                    acceptRequest={acceptRequest}
                    addToFriends={addToFriends}
                    deleteFromFriends={deleteFromFriends}
                    usersForSearch={usersForSearch}
                    setUsersForSearch={setUsersForSearch}
                />
            }
            friendsComponent={
                <FriendsContainer
                    id={id}
                    deleteRequest={deleteFromFriends}
                    friends={friends}
                    setFriends={setFriends}
                />
            }
            incomingRequestsComponent={
                <IncomingRequestsContainer
                    id={id}
                    acceptRequest={acceptRequest}
                    declineRequest={declineRequest}
                    incomingRequests={incomingRequests}
                    setIncomingRequests={setIncomingRequests}
                />
            }
            outgoingRequestsComponent={
                <OutgoingRequestsContainer
                    id={id}
                    deleteRequest={deleteFromFriends}
                    outgoingRequests={outgoingRequests}
                    setOutgoingRequests={setOutgoingRequests}
                />
            }
        />
    );
};

export default ProfilePageContainer;
