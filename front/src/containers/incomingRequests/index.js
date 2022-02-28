import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import React from "react";
import PropTypes from "prop-types";
import {useQuery} from "react-query";
import {getIncomingRequests} from "../api/usersCrud";
import ReactLoading from "react-loading";

const IncomingRequests = ({id}) => {

    const {isFetching: incomingRequestsFetching, data: incomingRequestsData} = useQuery('incoming-requests', () => getIncomingRequests(id));
    let incomingRequests = incomingRequestsData?.data;

    const handleClose = (event) => {
        event.preventDefault();
    };

    const decline = (user) => {

    }

    const approve = (user) => {

    }

    return (
        <>
            <h2>Incoming Requests</h2>
            {incomingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {incomingRequests?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} handleClose={handleClose} menu={true} approve={approve} decline={decline}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

IncomingRequests.propTypes = {
    id: PropTypes.number.isRequired,
};

export default IncomingRequests;


