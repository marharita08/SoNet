import React from "react";
import AddFriendIconBtn from "../../atoms/iconButtons/AddFriendIconBtn";
import RemoveFriendIconBtn from "../../atoms/iconButtons/RemoveFriendIconBtn";
import PropTypes from "prop-types";
import {userForSearchPropTypes} from "../../../propTypes/userPropTypes";

const SearchUsersOptionIconBtn = ({user, deleteFromFriends, addToFriends, accept}) => {
    return (
        <>
            {
                (user.is_friends || user.is_outgoing_request) ?
                    <RemoveFriendIconBtn
                        onClick={
                            () => deleteFromFriends(user.request_id)
                        }
                    /> :
                    <AddFriendIconBtn
                        onClick={
                            () => user.is_not_friends ? addToFriends(user.user_id) : accept(user.request_id)
                        }
                    />
            }
        </>
    );
};

SearchUsersOptionIconBtn.propTypes = {
    user: userForSearchPropTypes,
    deleteFromFriends: PropTypes.func.isRequired,
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired
}

export default SearchUsersOptionIconBtn;
