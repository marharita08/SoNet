import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
    },
    margin: {
        margin: theme.spacing(1)
    },
    dialogActions: {
        justifyContent: "center"
    }
}));
