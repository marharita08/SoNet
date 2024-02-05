import React from "react";
import SNLoading from "../../atoms/loading/SNLoading";
import ErrorBoundary from "../../ErrorBoundary";
import UserCard from "./UserCard";
import PropTypes from "prop-types";
import {usersCardPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const UserCards = ({users, heading, isMenu, isFetching, acceptRequest, declineRequest, deleteRequest}) => {

  const classes = useStyles();

  return (
    <div className={classes.outerContainer}>
      {
        (isFetching || users?.length !== 0) &&
        <h2>{heading}</h2>
      }
      <SNLoading isLoading={isFetching}/>
      {
        users?.map(
          (user) =>
            <ErrorBoundary key={user.user_id}>
              <UserCard
                user={user}
                deleteRequest={deleteRequest}
                acceptRequest={acceptRequest}
                declineRequest={declineRequest}
                isMenu={isMenu}
              />
            </ErrorBoundary>
        )
      }
    </div>
  );
};

UserCards.propTypes = {
  users: usersCardPropTypes,
  heading: PropTypes.string.isRequired,
  isMenu: PropTypes.bool,
  isFetching: PropTypes.bool,
  acceptRequest: PropTypes.func,
  declineRequest: PropTypes.func,
  deleteRequest: PropTypes.func
};

export default UserCards;
