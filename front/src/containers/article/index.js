import React from 'react';

import {Article} from '../../components/article';
import {useParams} from "react-router-dom";

export function ArticleContainer() {
    let {id} = useParams();
    return (
        <div>
            <Article id={id}/>
        </div>
    );
}
