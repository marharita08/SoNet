import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import {getFriends} from "../api/usersCrud";
import ReactLoading from "react-loading";

const Friends = ({id}) => {

    const {isFetching: friendsFetching, data: friendsData} = useQuery('friends', () => getFriends(id));
    let friends = friendsData?.data;

    const handleClose = (event) => {
        event.preventDefault();
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
};

export default Friends;


