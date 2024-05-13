import React from "react";
import PropTypes from "prop-types";

import SNLoading from "../../atoms/loading/SNLoading";
import ErrorBoundary from "../../ErrorBoundary";

const ProfilePageComponent = ({
  profileComponent,
  editProfileComponent,
  searchUsersComponent,
  friendsComponent,
  incomingRequestsComponent,
  outgoingRequestsComponent,
  recommendationsComponent,
  isLoading,
  isCurrentUser,
}) => {
  return (
    <>
      <SNLoading isLoading={isLoading}/>
      <ErrorBoundary>
        {profileComponent}
      </ErrorBoundary>
      {
        isCurrentUser &&
        <>
          <ErrorBoundary>
            {editProfileComponent}
          </ErrorBoundary>
          <ErrorBoundary>
            {searchUsersComponent}
          </ErrorBoundary>
          <ErrorBoundary>
            {recommendationsComponent}
          </ErrorBoundary>
        </>
      }
      <ErrorBoundary>
        {friendsComponent}
      </ErrorBoundary>
      {
        isCurrentUser &&
        <>
          <ErrorBoundary>
            {incomingRequestsComponent}
          </ErrorBoundary>
          <ErrorBoundary>
            {outgoingRequestsComponent}
          </ErrorBoundary>
        </>
      }
    </>
  );
};

ProfilePageComponent.propTypes = {
  profileComponent: PropTypes.node.isRequired,
  editProfileComponent: PropTypes.node.isRequired,
  searchUsersComponent: PropTypes.node.isRequired,
  friendsComponent: PropTypes.node.isRequired,
  incomingRequestsComponent: PropTypes.node.isRequired,
  outgoingRequestsComponent: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  isCurrentUser: PropTypes.bool.isRequired
};

export default ProfilePageComponent;
