import { useEffect, useMemo, useState } from "react";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { lightTheme, darktheme } from "./config/theme";
import Router from "./routes";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const value = localStorage.getItem("theme");
    setThemeMode(value);
  }, [themeMode]);

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darktheme),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router setIsThemeLight={setThemeMode} isThemeLight={themeMode} />
    </ThemeProvider>
  );
}

export default App;
