import React, {useContext, useState} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "react-query";

import ProfileComponent from "../../../components/layouts/profile/ProfileComponent";
import EditProfileContainer from "../../modals/editProfile/EditProfileContainer";
import {getUser} from "../../../api/usersCrud";
import OutgoingRequestsContainer from "../../layouts/outgoingRequests/OutgoingRequestsContainer";
import authContext from "../../../context/authContext";
import FriendsContainer from "../../layouts/friends/FriendsContainer";
import IncomingRequestsContainer from "../../layouts/incomingRequests/IncomingRequestsContainer";
import {updateRequest, deleteRequest, getRequest, insertRequest} from "../../../api/friendsCrud";
import SearchUsersContainer from "../../layouts/searchUsers/SearchUsersContainer";
import handleResponseContext from "../../../context/handleResponseContext";
import ProfilePageComponent from "../../../components/pages/profilePage/ProfilePageComponent";
import usersForSearchService from "../../../services/usersForSearchService";
import requestsService from "../../../services/requestsService";
import currentRequestService from "../../../services/currentRequestService";
import RecommendationsContainer from "../../layouts/recommendations/RecommendationsContainer";
import recommendationsService from "../../../services/recommendationsService";
import {useLocations} from "./useLocations";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

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
  const [recommendations, setRecommendations] = useState([]);
  // owner of currently open profile
  const [user, setUser] = useState();
  // friends request between currently authenticated user
  // and owner of currently open profile
  const [currentRequest, setCurrentRequest] = useState(null);

  const {locations, onStateChange, onCountryChange} = useLocations();

  const {isFetching: isUserFetching} = useQueryWrapper(
    `user ${id}`,
    () => getUser(id),
    {
      onSuccess: (data) => {
        setUser(data.data);
        const {country_id, state_id} = data.data;
        country_id && onCountryChange(country_id);
        state_id && onStateChange(state_id);
      }
    }
  );

  const isCurrentUser = (user?.user_id === currentUser.user_id) && !isUserFetching;

  const {isFetching: isRequestFetching} = useQueryWrapper(
    `request ${id}`,
    () => getRequest(id),
    {
      onSuccess: (data) => setCurrentRequest(data?.data)
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
        setRecommendations(recommendationsService.deleteUser(recommendations, request.user_id));
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

  const handleHideRecommendation = (id) => {
    setRecommendations(recommendationsService.deleteUser(recommendations, id))
  }

  return (
    <div key={id}>
      <ProfilePageComponent
        isCurrentUser={isCurrentUser}
        isLoading={isUserFetching}
        profileComponent={
          <ProfileComponent
            user={user}
            actions={{handleEdit, handleAddToFriends, handleAccept, handleDeleteFromFriends}}
            flags={{isCurrentUser, isAdmin}}
            currentRequest={currentRequest}
            loading={{
              isLoading: isAcceptLoading || isAddLoading || isDeleteLoading,
              isFetching: isRequestFetching
            }}
          />
        }
        editProfileComponent={
          <EditProfileContainer
            isModalOpen={isEditProfileModalOpen}
            user={user}
            locations={locations}
            actions={{setUser, onCountryChange, onStateChange, setIsModalOpen: setIsEditProfileModalOpen}}
          />
        }
        searchUsersComponent={
          <SearchUsersContainer
            actions={{acceptRequest, addToFriends, deleteFromFriends, setUsersForSearch}}
            usersForSearch={usersForSearch}
          />
        }
        friendsComponent={
          <FriendsContainer
            id={id}
            friends={friends}
            actions={{deleteRequest: deleteFromFriends, setFriends}}
          />
        }
        incomingRequestsComponent={
          <IncomingRequestsContainer
            id={id}
            incomingRequests={incomingRequests}
            actions={{acceptRequest, declineRequest, setIncomingRequests}}
          />
        }
        outgoingRequestsComponent={
          <OutgoingRequestsContainer
            id={id}
            outgoingRequests={outgoingRequests}
            actions={{deleteRequest: deleteFromFriends, setOutgoingRequests}}
          />
        }
        recommendationsComponent={
          <RecommendationsContainer
            id={id}
            recommendations={recommendations}
            actions={{setRecommendations, addToFriends, handleHideRecommendation}}
          />
        }
      />
    </div>
  );
};

export default ProfilePageContainer;
