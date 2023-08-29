import React from "react";
import {useQuery} from "react-query";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getFriends} from "../../api/usersCrud";
import PropTypes from "prop-types";
import Loading from "../../components/loading";

const Friends = ({id, deleteRequest, friends, setFriends}) => {

    const {isFetching: friendsFetching} = useQuery('friends', () => getFriends(id), {
        onSuccess: (data) => setFriends(data?.data),
        refetchInterval: false,
        refetchOnWindowFocus: false
    });

    return (
        <div className={"margin"}>
            {
                (friendsFetching || friends?.length !== 0) &&
                <h2 className={'inline'}>Friends</h2>
            }
            <Loading isLoading={friendsFetching} align={'left'}/>
            {friends?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <User user={user} deleteRequest={deleteRequest} menu={false}/>
                </ErrorBoundary>
            )}
        </div>
    );
}

Friends.propTypes = {
    id: PropTypes.number.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    friends: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),
    setFriends: PropTypes.func.isRequired,
};

export default Friends;
