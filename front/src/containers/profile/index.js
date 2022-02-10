import React from 'react';
import ReactLoading from 'react-loading';

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getFriends, getIncomingRequests, getOutgoingRequests, getUser} from "../api/usersCrud";
import {getUniversities} from "../api/universitiesCrud";
import {getFieldVisibilities} from "../api/visibilitiesCrud";
import Users from "../../components/users";

export function ProfileContainer() {
    let {id} = useParams();
    const {isFetching: userFetching, data: userData} = useQuery('user', () => getUser(id));
    const {isFetching: universitiesFetching, data: universitiesData} = useQuery('universities', () => getUniversities());
    const {isFetching: visibilitiesFetching, data: visibilitiesData} = useQuery('visibilities', () => getFieldVisibilities());
    const {isFetching: friendsFetching, data: friendsData} = useQuery('friends', () => getFriends(id));
    const {isFetching: incomingRequestsFetching, data: incomingRequestsData} = useQuery('incoming-requests', () => getIncomingRequests(id));
    const {isFetching: outgoingRequestsFetching, data: outgoingRequestsData} = useQuery('outgoing-requests', () => getOutgoingRequests(id));
    let users = userData?.data;
    let universities = universitiesData?.data;
    let visibilities = visibilitiesData?.data;
    let friends = friendsData?.data;
    let incomingRequests = incomingRequestsData?.data;
    let outgoingRequests = outgoingRequestsData?.data;

    return (
        <>
            {(userFetching || universitiesFetching || visibilitiesFetching) && <ReactLoading type={'balls'} color='#001a4d'/>}
            {users?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <Profile user={user} universities={universities} visibilities={visibilities}/>
                </ErrorBoundary>
            )}
            <Users users={friends} header={'Friends'}/>
            {friendsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <Users users={incomingRequests} header={'Incoming requests'}/>
            {incomingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
            <Users users={outgoingRequests} header={'Outgoing requests'}/>
            {outgoingRequestsFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
        </>
    );
}
