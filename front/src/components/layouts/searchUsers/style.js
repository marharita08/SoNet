import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
  search: {
    width: "95%",
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "400px"
    }
  },
  link: {
    width: "calc(100% - 60px)",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  },
  field: {
    display: "flex",
    alignItems: "flex-end"
  },
  icon: {
    color: theme.palette.action.active
  },
  avatar: {
    margin: theme.spacing(1)
  },
  option: {
    display: "flex",
    alignItems: "center"
  },
  searchCard: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    [theme.breakpoints.up("sm")]: {
      width: "424px"
    }
  }
}));
