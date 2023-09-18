import React from "react";
import HeaderButton from "../../atoms/buttons/HeaderButton";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PropTypes from "prop-types";
import {useStyles} from "./style";
import LinkToRoot from "../../atoms/links/LinkToRoot";
import LinkToAllArticles from "../../atoms/links/LinkToAllArticles";

const HeaderButtons = ({isAdmin, handleAddArticle}) => {

    const classes = useStyles();

    return (
        <div className={classes.buttonsContainer}>
            <LinkToRoot
                content={
                    <HeaderButton
                        text={"Home"}
                        icon={<HomeIcon fontSize={"small"}/>}
                        className={classes.homeButton}
                    />
                }
            />
            {
                isAdmin &&
                <LinkToAllArticles
                    content={
                        <HeaderButton
                            text={"All articles"}
                            icon={<DescriptionIcon fontSize={"small"}/>}
                        />
                    }
                />
            }
            <HeaderButton
                text={"Add article"}
                icon={<NoteAddIcon fontSize={"small"}/>}
                onClick={handleAddArticle}
            />
        </div>
    );
};

HeaderButtons.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    handleAddArticle: PropTypes.func.isRequired
};

export default HeaderButtons;
