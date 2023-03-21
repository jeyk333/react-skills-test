import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#f7f6f8", light: "#f6f9fc" },
    secondary: { main: "#1d73f0" },
  },
});

const darktheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#2a2b31", light: "#313238" },
    secondary: { main: "#1d73f0" },
  },
});

export { lightTheme, darktheme };
