import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    card: {
        width: "100%",
        margin: theme.spacing(1),
        display: "inline-block",
        [theme.breakpoints.up("sm")]: {
            width: "350px",
        }
    },
    outerContainer: {
        margin: theme.spacing(1),
    }
}));
