import React from 'react';

import AddArticle from '../../components/addArticle';
import ErrorBoundary from "../../components/ErrorBoundary";
import {useQuery} from "react-query";
import {getArticleVisibilities} from "../api/visibilitiesCrud";

export function AddArticleContainer() {
    const { data } = useQuery('visibilities', () => getArticleVisibilities());
    const visibilities = data?.data;

    return (
        <ErrorBoundary>
            <AddArticle visibilities={visibilities}/>
        </ErrorBoundary>
    );
}
