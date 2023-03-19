import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#f7f6f8" },
  },
});

const darktheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#2a2b31" },
  },
});

const getTheme = (mode = "light") => {
  return mode === "light" ? lightTheme : darktheme;
};

export default getTheme;
