import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    fieldsContainer: {
        width: "100%",
        padding: theme.spacing(1),
        display: "inline-block",
        [theme.breakpoints.up("sm")]: {
            width: "550px",
            padding: theme.spacing(4)
        }
    },
    imageContainer: {
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            justifyContent: "flex-start"
        }
    },
    fullWidth: {
        width: `calc(100% - ${theme.spacing(2)})`,
    },
    notFullWidth: {
        width: `calc(100% - ${theme.spacing(2)})`,
        [theme.breakpoints.up("sm")]: {
            width: "62%"
        }
    },
    field: {
        margin: theme.spacing(6, 0, 1.5),
        display: "block",
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(0, 2, 6, 0),
            display: "inline-block"
        }
    },
    visibility: {
        margin: theme.spacing(2, 0, 1.5),
        display: "block",
        width: `calc(100% - ${theme.spacing(2)})`,
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(0, 0, 6, 2),
            display: "inline-block",
            width: "33%"
        }
    },
    container: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    },
    button: {
        margin: theme.spacing(1),
        display: "flex",
        justifyContent: "center"
    },
    heading: {
        margin: theme.spacing(4)
    }
}));
