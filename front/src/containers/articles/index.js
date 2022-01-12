import React from 'react';

import {Article} from '../../components/article';

export function ArticlesContainer() {
    return (
        <div>
            <Article id={1}/>
            <Article id={2}/>
            <Article id={3}/>
        </div>
    );
}
