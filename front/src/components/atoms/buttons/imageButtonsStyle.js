import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    button: {
        [theme.breakpoints.down("sm")]: {
            "& .MuiButton-startIcon": {
                margin: 0
            }
        }
    },
    buttonText: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}));
