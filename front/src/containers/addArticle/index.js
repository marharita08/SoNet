import React from 'react';

import AddArticle from '../../components/addArticle';
import ErrorBoundary from "../../components/ErrorBoundary";

export function AddArticleContainer() {
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
            <AddArticle visibilities={visibilities}/>
        </ErrorBoundary>
    );
}
