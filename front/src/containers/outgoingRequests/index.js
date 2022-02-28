import ErrorBoundary from "../../components/ErrorBoundary";
import User from "../../components/user";
import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import {useQuery} from "react-query";
import {getOutgoingRequests} from "../api/usersCrud";

const OutgoingRequests = ({id}) => {

    const {isFetching: outgoingRequestsFetching, data: outgoingRequestsData} = useQuery('outgoing-requests', () => getOutgoingRequests(id));
    let outgoingRequests = outgoingRequestsData?.data;

    const handleClose = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2>Outgoing Requests</h2>
            {outgoingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <div>
                {outgoingRequests?.map((user)=>
                    <ErrorBoundary key={user.user_id}>
                        <User user={user} handleClose={handleClose} menu={false}/>
                    </ErrorBoundary>
                )}
            </div>
        </>
    );
}

OutgoingRequests.propTypes = {
   id: PropTypes.number.isRequired,
};

export default OutgoingRequests;


