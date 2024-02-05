import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import ProfileComponent from "../../../components/layouts/profile/ProfileComponent";
import EditProfileContainer from "../../modals/editProfile/EditProfileContainer";
import {getUser} from "../../../api/usersCrud";
import OutgoingRequestsContainer from "../../layouts/outgoingRequests/OutgoingRequestsContainer";
import authContext from "../../../context/authContext";
import FriendsContainer from "../../layouts/friends/FriendsContainer";
import IncomingRequestsContainer from "../../layouts/incomingRequests/IncomingRequestsContainer";
import {updateRequest, deleteRequest, getRequest, insertRequest} from "../../../api/friendsCrud";
import SearchUsersContainer from "../../layouts/searchUsers/SearchUsersContainer";
import {refetchOff} from "../../../config/refetchOff";
import handleResponseContext from "../../../context/handleResponseContext";
import ProfilePageComponent from "../../../components/pages/profilePage/ProfilePageComponent";
import usersForSearchService from "../../../services/usersForSearchService";
import requestsService from "../../../services/requestsService";
import currentRequestService from "../../../services/currentRequestService";
import {
  GetCountries,
  GetState,
  GetCity
} from "react-country-state-city";

const ProfilePageContainer = () => {
  const {id: idStr} = useParams();
  const id = +idStr;
  const {user: currentUser, isAdmin} = useContext(authContext);
  const {handleError} = useContext(handleResponseContext);
  const status = {
    underConsideration: 1,
    accepted: 2,
    denied: 3
  };

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [usersForSearch, setUsersForSearch] = useState([]);
  // owner of currently open profile
  const [user, setUser] = useState();
  // friends request between currently authenticated user
  // and owner of currently open profile
  const [currentRequest, setCurrentRequest] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryId, setCountryId] = useState();

  const parseResults = (results) => {
    return results.map(result => ({
      label: result.name,
      value: result.id
    }));
  };

  useEffect(() => {
    GetCountries().then(
      (results) => setCountries(parseResults(results))
    );
  }, []);

  const onCountryChange = (countryId) => {
    setCountryId(countryId);
    GetState(countryId).then(
      (results) => setStates(parseResults(results))
    );
  };

  const onStateChange = (stateId) => {
    GetCity(countryId, stateId).then(
      (results) => setCities(parseResults(results))
    );
  };


  const {isFetching: isUserFetching} = useQuery(
    `user ${id}`,
    () => getUser(id),
    {
      onSuccess: (data) => setUser(data.data),
      ...refetchOff
    }
  );
  const {isFetching: isRequestFetching} = useQuery(
    `request ${id}`,
    () => getRequest(id),
    {
      onSuccess: (data) => setCurrentRequest(data?.data),
      ...refetchOff
    }
  );

  const handleEdit = () => {
    setIsEditProfileModalOpen(true);
  };

  const {mutate: addMutate, isLoading: isAddLoading} = useMutation(insertRequest, {
    onSuccess: (data) => {
      const {data: {request}} = data;
      if (id !== currentUser.user_id) {
        setCurrentRequest(currentRequestService.addRequest(request));
      } else {
        setOutgoingRequests(requestsService.addRequest(outgoingRequests, request));
        setUsersForSearch(usersForSearchService.addRequest(usersForSearch, request));
      }
    },
    onError: handleError
  });
  const {mutate: acceptMutate, isLoading: isAcceptLoading} = useMutation(updateRequest, {
    onSuccess: (data) => {
      if (id !== currentUser.user_id) {
        setCurrentRequest(currentRequestService.acceptRequest(currentRequest));
      } else {
        const {data: {id: requestIdStr}} = data;
        const request_id = +requestIdStr;
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
        setCurrentRequest(currentRequestService.deleteRequest());
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
    <div key={id}>
      <ProfilePageComponent
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
            isModalOpen={isEditProfileModalOpen}
            setIsModalOpen={setIsEditProfileModalOpen}
            user={user}
            setUser={setUser}
            countries={countries}
            states={states}
            cities={cities}
            onCountryChange={onCountryChange}
            onStateChange={onStateChange}
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
    </div>
  );
};

export default ProfilePageContainer;
