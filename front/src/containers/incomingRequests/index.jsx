import React from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/layouts/user";
import {getIncomingRequests} from "../../api/usersCrud";
import Loading from "../../components/atoms/loading";

const IncomingRequests = ({id, accept, decline, incomingRequests, setIncomingRequests}) => {

    const {isFetching: incomingRequestsFetching} =
        useQuery("incoming-requests", () => getIncomingRequests(id), {
            onSuccess: (data) => setIncomingRequests(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
        });

    return (
        <div className={"margin"}>
            {
                (incomingRequestsFetching || incomingRequests?.length !== 0) &&
                <h2>Incoming Requests</h2>
            }
            <Loading isLoading={incomingRequestsFetching} align={"left"}/>
            {incomingRequests?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <User user={user} menu={true} accept={accept} decline={decline}/>
                </ErrorBoundary>
            )}
        </div>
    );
};

IncomingRequests.propTypes = {
    id: PropTypes.number.isRequired,
    accept: PropTypes.func.isRequired,
    decline: PropTypes.func.isRequired,
    incomingRequests: PropTypes.arrayOf(
        PropTypes.shape({
            request_id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),
    setIncomingRequests: PropTypes.func.isRequired,
};

export default IncomingRequests;
