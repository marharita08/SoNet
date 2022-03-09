import React from "react";
import {useQuery} from "react-query";
import ReactLoading from "react-loading";

import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import {getFriends} from "../../api/usersCrud";
import PropTypes from "prop-types";

const Friends = ({id, deleteMutate}) => {

    const {isFetching: friendsFetching, data: friendsData} = useQuery('friends', () => getFriends(id));
    let friends = friendsData?.data;

    const handleClose = (user_id) => {
        deleteMutate({
            current_user_id: id,
            user_id: user_id
        });
    };

    return (
        <>
            <h2>Friends</h2>
            {friendsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {friends?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} handleClose={handleClose} menu={false}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

Friends.propTypes = {
    id: PropTypes.number.isRequired,
    deleteMutate: PropTypes.func.isRequired,
};

export default Friends;


