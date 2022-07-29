import React from "react";
import {useQuery} from "react-query";
import ReactLoading from "react-loading";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getFriends} from "../../api/usersCrud";
import PropTypes from "prop-types";

const Friends = ({id, deleteRequest, friends, setFriends}) => {

    const {isFetching: friendsFetching} = useQuery('friends', () => getFriends(id), {
        onSuccess: (data) => setFriends(data?.data)
    });

    return (
        <>
            {
                (friendsFetching || friends.length !== 0) &&
                <h2 className={'inline'}>Friends</h2>
            }
            {friendsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {friends?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} deleteRequest={deleteRequest} menu={false}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
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


