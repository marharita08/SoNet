import React from "react";
import {useQuery} from "react-query";
import {getFriends} from "../../../api/usersCrud";
import PropTypes from "prop-types";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {refetchOff} from "../../../config/refetchOff";

const FriendsContainer = ({id, deleteRequest, friends, setFriends}) => {

    const {isFetching} = useQuery(
        "friends",
        () => getFriends(id),
        {
            onSuccess: (data) => setFriends(data?.data),
            ...refetchOff
        }
    );

    return (
        <UserCards
            heading={"Friends"}
            deleteRequest={deleteRequest}
            isFetching={isFetching}
            users={friends}
        />
    );
};

FriendsContainer.propTypes = {
    id: PropTypes.number.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    friends: requestsPropTypes,
    setFriends: PropTypes.func.isRequired,
};

export default FriendsContainer;
