import React from 'react';

import AddArticle from '../../components/addArticle';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useQuery} from "react-query";
import {getVisibilities} from "./api/crud";

export function AddArticleContainer() {
    const { data } = useQuery('visibilities', () => getVisibilities());
    const visibilities = data?.data;

    return (
        <ErrorBoundary>
            <AddArticle visibilities={visibilities}/>
        </ErrorBoundary>
    );
}
