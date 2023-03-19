import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import getTheme from "./config/theme";
import Router from "./routes";

function App() {
  return (
    <ThemeProvider theme={getTheme("light")}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
