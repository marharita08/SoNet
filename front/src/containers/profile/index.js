import React from 'react';

import Profile from '../../components/profile';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useParams} from "react-router-dom";

export function ProfileContainer() {
    let {id} = useParams();
    let user = {
        id: id,
        username: {
            value: 'username',
            availableTo: 1
        },
        email: {
            value: 'example@gmail.com',
            availableTo: 1
        },
        phone: {
            value: '+380xxxxxxxxx',
            availableTo: 1
        },
        university: {
            id: 1,
            availableTo: 1
        },
        avatar: '/images/user.png'
    };
    let universities = [
        {
            id: 0,
            name: 'Not chosen'
        },
        {
            id: 1,
            name: 'Sumy State University'
        }];
    let visibilities = [
        {
            id: 1,
            name: 'All'
        },
        {
            id: 2,
            name: 'Friends'
        },
        {
            id: 3,
            name: 'Me'
        }];
    return (
        <ErrorBoundary>
            <Profile user={user} universities={universities} visibilities={visibilities}/>
        </ErrorBoundary>
    );
}