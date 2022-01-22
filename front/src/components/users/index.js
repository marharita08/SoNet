import ErrorBoundary from "../ErrorBoundary";
import User from "../user";
import React from "react";
import PropTypes from "prop-types";

const Users = ({header, users}) => {
    return (
        <>
            <h2>{header}</h2>
            <div>
                {users?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    })),
    header: PropTypes.string.isRequired
};

export default Users;


