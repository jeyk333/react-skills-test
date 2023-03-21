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

  // Currently, while updating theme, you may find some inconsitency, it is because, I didn't update all the section colors based on the theme, due to time. Reloading will solve the issue
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
