import React from "react";
import {useQuery} from "react-query";
import {getFriends} from "../../api/usersCrud";
import PropTypes from "prop-types";
import {requestsPropTypes} from "../../propTypes/requestPropTypes";
import UserCards from "../../components/layouts/userCards/UserCards";

const Friends = ({id, deleteRequest, friends, setFriends}) => {

    const {isFetching} = useQuery(
        "friends",
        () => getFriends(id),
        {
            onSuccess: (data) => setFriends(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
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

Friends.propTypes = {
    id: PropTypes.number.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    friends: requestsPropTypes,
    setFriends: PropTypes.func.isRequired,
};

export default Friends;
