import React from "react";
import {Link} from "react-router-dom";
import HeaderButton from "../../atoms/buttons/HeaderButton";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PropTypes from "prop-types";
import {useStyles} from "./style";

const HeaderButtons = ({authenticated, isAdmin, handleClickOpen}) => {

    const classes = useStyles();

    return (
        <>
            {
                authenticated &&
                <div className={classes.buttonsContainer}>
                    <Link to={"/"}>
                        <HeaderButton
                            text={"Home"}
                            icon={<HomeIcon fontSize={"small"}/>}
                            className={classes.homeButton}/>
                    </Link>
                    {
                        isAdmin &&
                        <Link to={"/all-articles"}>
                            <HeaderButton
                                text={"All articles"}
                                icon={<DescriptionIcon fontSize={"small"}/>}
                            />
                        </Link>
                    }
                    <HeaderButton
                        text={"Add article"}
                        icon={<NoteAddIcon fontSize={"small"}/>}
                        onClick={handleClickOpen}
                    />
                </div>
            }
        </>
    );
};

HeaderButtons.propTypes = {
    authenticated: PropTypes.bool,
    isAdmin: PropTypes.bool,
    handleClickOpen: PropTypes.func.isRequired
};

export default HeaderButtons;
