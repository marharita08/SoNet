import React, {useState} from "react";
import { useBetween } from 'use-between';
import './header.css';

export const useShareableState = () => {
    const [articles, setArticles] = useState(true);
    const [addArticle, setAddArticle] = useState(false);
    const [profile, setProfile] = useState(false);
    return {
        articles, setArticles,
        addArticle, setAddArticle,
        profile, setProfile
    }
}

export function HeaderContainer() {
    const {setArticles, setAddArticle, setProfile} = useBetween(useShareableState);
    const showArticles = () => {
        setArticles(true);
        setAddArticle(false);
        setProfile(false);
    }

    const showAddArticle = () => {
        setArticles(false);
        setAddArticle(true);
        setProfile(false);
    }

    const showProfile = () => {
        setArticles(false);
        setAddArticle(false);
        setProfile(true);
    }
    return (
        <header>
            <button onClick={showArticles} className={"articles"}>Articles</button>
            <button onClick={showAddArticle}>Add article</button>
            <button onClick={showProfile} className={"profile"}>Profile</button>
        </header>
    );
}
