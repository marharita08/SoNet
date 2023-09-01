import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    fieldsContainer: {
        width: "100%"
    },
    avatar: {
        margin: theme.spacing(3, "auto")
    },
    field: {
        width: "100%",
        margin: theme.spacing(3, 0, 1),
        display: "block",
        [theme.breakpoints.up("sm")]: {
            width: "62%",
            margin: theme.spacing(3, 1, 1, 0),
            display: "inline-block",
        },
    },
    visibility: {
        width: "100%",
        margin: theme.spacing(2, 0, 1),
        display: "block",
        [theme.breakpoints.up("sm")]: {
            width: "33%",
            margin: theme.spacing(3, 0, 1, 1),
            display: "inline-block",
        },
    },
}));
