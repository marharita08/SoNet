import {createTheme} from "@mui/material/styles";

let theme = createTheme({
    typography: {
        subtitle1: {
            fontWeight: "bold"
        }
    },
    dialogActions: {
        justifyContent: "center"
    },
    spacing: 5,
    palette: {
        primary: {
            main: "#001a4d"
        },
        secondary: {
            main: "#00ffff"
        },
        background: {
            default: "#f2f2f2"
        },
        facebook: {
            main: "#395697",
            dark: "#003366",
            contrastText: "#FFF"
        },
        google: {
            main: "#FFF",
            dark: "#f2f2f2",
            darker: "#E8E8E8",
            contrastText: "#000"
        }
    },
    avatarSizes: {
        sm: {
            width: 30,
            height: 30,
        },
        md: {
            width: 40,
            height: 40,
        },
        lg: {
            width: 60,
            height: 60
        },
        xl: {
            width: 120,
            height: 120
        }
    },
});

theme = createTheme(theme, {
    commentCardHeader: {
        padding: theme.spacing(2, 2, 1)
    },
    commentCardContent: {
        padding: theme.spacing(1, 2, 2),
        "&:last-child": {
            paddingBottom: theme.spacing(3)
        }
    }
})

export default theme;
