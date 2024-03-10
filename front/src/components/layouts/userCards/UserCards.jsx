import React from "react";
import PropTypes from "prop-types";

import SNLoading from "../../atoms/loading/SNLoading";
import ErrorBoundary from "../../ErrorBoundary";
import UserCard from "./UserCard";
import {usersCardPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const UserCards = ({users, heading, isMenu, isFetching, isRecommendation, ...actions}) => {

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
                actions={actions}
                user={user}
                isMenu={isMenu}
                isRecommendation={isRecommendation}
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
  isRecommendation: PropTypes.bool,
  isMenu: PropTypes.bool,
  isFetching: PropTypes.bool,
  deleteRequest: PropTypes.func,
  acceptRequest: PropTypes.func,
  declineRequest: PropTypes.func,
  addRequest: PropTypes.func,
  hideRecommendation: PropTypes.func
};

export default UserCards;
