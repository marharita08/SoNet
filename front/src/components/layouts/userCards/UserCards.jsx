import React from "react";
import SNLoading from "../../atoms/loading/SNLoading";
import ErrorBoundary from "../../ErrorBoundary";
import UserCard from "./UserCard";
import PropTypes from "prop-types";
import {usersCardPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const UserCards = ({users, heading, isMenu, isFetching, accept, decline, deleteRequest}) => {

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
                                accept={accept}
                                decline={decline}
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
    accept: PropTypes.func,
    decline: PropTypes.func,
    deleteRequest: PropTypes.func
};

export default UserCards;
