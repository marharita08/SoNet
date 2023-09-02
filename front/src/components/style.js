import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
    },
    margin: {
        margin: theme.spacing(1)
    },
    addArticleField: {
        margin: theme.spacing(2, 0),
    },
    addArticleImg: {
        margin: theme.spacing(1, 0),
        width: "100%"
    },
    heading: {
        textAlign: "center"
    },
    closeButton: {
        float: "right",
    },
    flex: {
        display: "flex"
    },
    addCommentAvatar: {
        margin: theme.spacing(2, 1)
    },
    commentFieldContainer: {
        width: `calc(100% - 60px - ${theme.spacing(4)}px)`,
        margin: theme.spacing(1, 0),
    },
    replyToText: {
        fontStyle: "italic"
    },
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
    }
}));
