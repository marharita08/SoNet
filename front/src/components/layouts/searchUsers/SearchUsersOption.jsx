import React from "react";
import SearchUsersOptionUser from "./SearchUsersOptionUser";
import SearchUsersOptionIconBtn from "./SearchUsersOptionIconBtn";
import PropTypes from "prop-types";
import {userForSearchPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const SearchUsersOption = ({user, deleteFromFriends, addToFriends, acceptRequest}) => {

  const classes = useStyles();

  return (
    <div className={classes.option}>
      <SearchUsersOptionUser user={user}/>
      <SearchUsersOptionIconBtn
        user={user}
        addToFriends={addToFriends}
        deleteFromFriends={deleteFromFriends}
        acceptRequest={acceptRequest}
      />
    </div>
  );
};

SearchUsersOption.propTypes = {
  user: userForSearchPropTypes,
  deleteFromFriends: PropTypes.func.isRequired,
  addToFriends: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired
};

export default SearchUsersOption;
