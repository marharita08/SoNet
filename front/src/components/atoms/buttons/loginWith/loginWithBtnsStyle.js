import {makeStyles} from "@material-ui/core";

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
        backgroundColor: "#395697",
        color: "white",
        borderColor: "#395697",
        "&:hover": {
            backgroundColor: "#003366",
            borderColor: "#003366",
        }
    },
    googleLogin: {
        backgroundColor: "white",
        color: "black",
        borderColor: "#E8E8E8",
        "&:hover": {
            backgroundColor: "#f2f2f2"
        }
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));
