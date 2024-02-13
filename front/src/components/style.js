import {makeStyles} from "@mui/styles";

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
    width: `calc(100% - ${theme.avatarSizes.lg.width}px - ${theme.spacing(4)})`,
    margin: theme.spacing(1, 0),
  },
  replyToText: {
    fontStyle: "italic"
  },
  leftMargin: {
    marginLeft: theme.spacing(1)
  },
  bold: {
    fontWeight: "bold"
  },
  loadMoreBtn: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1)
  },
  menuItem: {
    display: "flex",
    alignItems: "flex-end"
  },
  articleCard: {
    margin: theme.spacing(2, "auto", 0, "auto"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "500px"
    }
  },
  truncateText: {
    display: "-webkit-box",
    "-webkit-line-clamp": 5,
    "-webkit-box-orient": "vertical",
    overflow: "hidden"
  },
  articleImgContainer: {
    display: "flex",
    justifyContent: "center"
  },
  link: {
    textDecoration: "none",
    color: "#000"
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
  },
  authForm: {
    margin: theme.spacing(2, 0, 6)
  },
  loginWithBtns: {
    margin: theme.spacing(5, 0)
  }
}));
