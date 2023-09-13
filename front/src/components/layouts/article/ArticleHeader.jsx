import React, {useState} from "react";
import {Avatar, CardHeader} from "@mui/material";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import CardUsername from "../../atoms/cardUsername/CardUsername";
import SNMenu from "../../atoms/menu/SNMenu";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTheme} from "@mui/material/styles";
import {articleHeaderPropTypes} from "./articleHeaderPropTypes";
import LinkToProfile from "../../atoms/links/LinkToProfile";

const ArticleHeader = ({article, isCurrentUser, isAdmin, handleEdit, handleDelete}) => {

    const theme = useTheme();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const editOnClick = (event) => {
        event.preventDefault();
        setMenuAnchorEl(null);
        handleEdit(article);
    };

    const deleteOnClick = (event) => {
        event.preventDefault();
        setMenuAnchorEl(null);
        handleDelete();
    };

    const menuItems = [
        {
            body: <MenuItemBody text={"Edit"} icon={<EditIcon/>}/>,
            onClick: editOnClick
        },
        {
            body: <MenuItemBody text={"Delete"} icon={<DeleteIcon/>}/>,
            onClick: deleteOnClick
        }
    ];

    return (
        <>
            <CardHeader
                avatar={
                    <LinkToProfile
                        user_id={article.user_id}
                        content={
                            <Avatar
                                src={article.avatar}
                                sx={theme.avatarSizes.lg}
                            />
                        }
                    />
                }
                action={(isCurrentUser || isAdmin) && <MoreVertIconBtn onClick={handleMenu}/>}
                title={
                    <LinkToProfile
                        user_id={article.user_id}
                        content={
                            <CardUsername username={article.name}/>
                        }
                    />
                }
                subheader={article.created_at}
            />
            <SNMenu
                id={"menu-article"}
                menuItems={menuItems}
                anchorEl={menuAnchorEl}
                onClose={handleClose}
            />
        </>
    );
};

ArticleHeader.propTypes = articleHeaderPropTypes;

export default ArticleHeader;
