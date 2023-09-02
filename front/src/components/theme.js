import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
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
