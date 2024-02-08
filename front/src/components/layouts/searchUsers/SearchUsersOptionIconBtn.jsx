import React from "react";
import PropTypes from "prop-types";

import AddFriendIconBtn from "../../atoms/iconButtons/AddFriendIconBtn";
import RemoveFriendIconBtn from "../../atoms/iconButtons/RemoveFriendIconBtn";
import {userForSearchPropTypes} from "../../../propTypes/userPropTypes";

const SearchUsersOptionIconBtn = ({user, actions}) => {

  const {deleteFromFriends, addToFriends, acceptRequest} = actions;

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
              () => user.is_not_friends ? addToFriends(user.user_id) : acceptRequest(user.request_id)
            }
          />
      }
    </>
  );
};

SearchUsersOptionIconBtn.propTypes = {
  user: userForSearchPropTypes,
  actions: PropTypes.shape({
    deleteFromFriends: PropTypes.func.isRequired,
    addToFriends: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired
  })
};

export default SearchUsersOptionIconBtn;
