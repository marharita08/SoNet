import React from 'react';
import {useBetween} from "use-between";

import {AddArticle} from '../../components/addArticle';
import {Articles} from '../../components/articles';
import {Profile} from '../../components/profile';
import {useShareableState} from '../header';

import './body.css';

export function BodyContainer() {
    const {articles, addArticle, profile} = useBetween(useShareableState);
    return (
        <div>
            {addArticle && <AddArticle/>}
            {articles && <Articles/>}
            {profile && <Profile/>}
        </div>
    );
}
