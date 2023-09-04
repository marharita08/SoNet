import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    loginWithBtn: {
        width: "220px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(2, "auto"),
        height: "50px",
        padding: theme.spacing(1, 4),
        cursor: "pointer"
    },
    facebookLogin: {
        backgroundColor: theme.palette.facebook.main,
        color: theme.palette.facebook.contrastText,
        borderColor: theme.palette.facebook.main,
        "&:hover": {
            backgroundColor: theme.palette.facebook.dark,
            borderColor: theme.palette.facebook.dark,
        }
    },
    googleLogin: {
        backgroundColor: theme.palette.google.main,
        color: theme.palette.google.contrastText,
        borderColor: theme.palette.google.darker,
        "&:hover": {
            backgroundColor: theme.palette.google.dark
        }
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));
