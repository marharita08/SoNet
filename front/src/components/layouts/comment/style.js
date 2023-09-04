import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    leftMargin: {
        marginLeft: theme.spacing(1)
    },
    cardHeader: {
        padding: theme.spacing(2, 2, 1)
    },
    cardContent: {
        padding: theme.spacing(1, 2, 2)
    }
}))