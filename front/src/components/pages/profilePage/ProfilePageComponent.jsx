import React from "react";
import SNLoading from "../../atoms/loading/SNLoading";
import ErrorBoundary from "../../ErrorBoundary";
import PropTypes from "prop-types";

const ProfilePageComponent = ({
    profileComponent,
    editProfileComponent,
    searchUsersComponent,
    friendsComponent,
    incomingRequestsComponent,
    outgoingRequestsComponent,
    isLoading,
    isCurrentUser,
    key
}) => {
    return (
        <>
            <SNLoading isLoading={isLoading}/>
            <div key={key}>
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
                            {friendsComponent}
                        </ErrorBoundary>
                        <ErrorBoundary>
                            {incomingRequestsComponent}
                        </ErrorBoundary>
                        <ErrorBoundary>
                            {outgoingRequestsComponent}
                        </ErrorBoundary>
                    </>
                }
            </div>
        </>
    )
}

ProfilePageComponent.propTypes = {
    profileComponent: PropTypes.node.isRequired,
    editProfileComponent: PropTypes.node.isRequired,
    searchUsersComponent: PropTypes.node.isRequired,
    friendsComponent: PropTypes.node.isRequired,
    incomingRequestsComponent: PropTypes.node.isRequired,
    outgoingRequestsComponent: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    isCurrentUser: PropTypes.bool.isRequired,
    key: PropTypes.number
}

export default ProfilePageComponent;
