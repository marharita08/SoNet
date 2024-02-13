import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  button: {
    [theme.breakpoints.down("xs")]: {
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));
