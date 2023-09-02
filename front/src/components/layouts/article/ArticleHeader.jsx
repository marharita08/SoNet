import React, {useState} from "react";
import {Avatar, CardHeader} from "@mui/material";
import {Link} from "react-router-dom";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import CardUsername from "../../atoms/cardUsername/CardUsername";
import SNMenu from "../../atoms/menu/SNMenu";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const ArticleHeader = ({article, isMenu, handleEdit, handleDelete}) => {

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
                    <Link to={`/profile/${article.user_id}`}>
                        <Avatar
                            src={article.avatar}
                            sx={theme.avatarSizes.lg}
                        />
                    </Link>
                }
                action={isMenu && <MoreVertIconBtn onClick={handleMenu}/>}
                title={
                    <Link to={`/profile/${article.user_id}`}>
                        <CardUsername username={article.name}/>
                    </Link>
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

ArticleHeader.propTypes = {
    article: PropTypes.shape({
        article_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string,
    }),
    isMenu: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default ArticleHeader;
