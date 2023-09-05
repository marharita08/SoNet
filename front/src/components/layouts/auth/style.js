import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    authCard: {
        width: "95%",
        textAlign: "center",
        margin: theme.spacing(2, "auto"),
        [theme.breakpoints.up("sm")]: {
            width: "500px"
        }
    },
    authField: {
        margin: theme.spacing(2, "auto"),
        width: "95%",
        [theme.breakpoints.up("sm")]: {
            width: "320px"
        }
    },
    authForm: {
        margin: theme.spacing(2, 0, 6)
    },
    loginWithBtns: {
        margin: theme.spacing(5, 0)
    }
}));
