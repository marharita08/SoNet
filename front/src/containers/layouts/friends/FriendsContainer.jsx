import React from "react";
import PropTypes from "prop-types";

import {getFriends} from "../../../api/usersCrud";
import {requestsPropTypes} from "../../../propTypes/requestPropTypes";
import UserCards from "../../../components/layouts/userCards/UserCards";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";

const FriendsContainer = ({id, friends, actions}) => {

  const {setFriends, ...cardActions} = actions
  const {isFetching} = useQueryWrapper(
    "friends",
    () => getFriends(id),
    {
      onSuccess: (data) => setFriends(data?.data)
    }
  );

  return (
    <UserCards
      heading={"Friends"}
      isFetching={isFetching}
      users={friends}
      {...cardActions}
    />
  );
};

FriendsContainer.propTypes = {
  id: PropTypes.number.isRequired,
  friends: requestsPropTypes,
  actions: PropTypes.shape({
    deleteRequest: PropTypes.func.isRequired,
    setFriends: PropTypes.func.isRequired,
  })
};

export default FriendsContainer;
