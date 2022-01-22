import React from 'react';
import ReactLoading from 'react-loading';

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getUniversities, getUser, getUsers, getVisibilities} from "./api/crud";
import Users from "../../components/users";

export function ProfileContainer() {
    let {id} = useParams();
    const {isFetching: userFetching, data: userData} = useQuery('user', () => getUser(id));
    const {isFetching: uFetching, data: uData} = useQuery('universities', () => getUniversities());
    const {isFetching: vFetching, data: vData} = useQuery('visibilities', () => getVisibilities());
    const {isFetching: fFetching, data: fData} = useQuery('users', () => getUsers());
    let users = userData?.data;
    let universities = uData?.data;
    let visibilities = vData?.data;
    let friends = fData?.data;

    return (
        <>
            {(userFetching || uFetching || vFetching) && <ReactLoading type={'balls'} color='#001a4d'/>}
            {users?.map((user) =>
                <ErrorBoundary key={user.user_id}>
                    <Profile user={user} universities={universities} visibilities={visibilities}/>
                </ErrorBoundary>
            )}
            <Users users={friends} header={'Friends'}/>
            {fFetching && <ReactLoading type={'balls'} color='#001a4d'/>}
        </>
    );
}
