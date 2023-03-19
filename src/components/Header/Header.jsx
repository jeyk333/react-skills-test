import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
  Avatar,
} from "@material-ui/core";

import clsx from "clsx";

import useStyles from "./styles";

function Header() {
  const [isThemeLight, setIsThemeLight] = useState(false);
  const classes = useStyles();

  const toggleTheme = (e) => {
    setIsThemeLight(e.target.checked);
    localStorage.setItem("theme", isThemeLight ? "light" : "dark");
  };

  return (
    <AppBar position="static" className={clsx(classes.appBar)} elevation={0}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" noWrap>
          Consumer 360
        </Typography>
        <div className={classes.rightContent}>
          <FormControlLabel
            control={<Switch checked={isThemeLight} onChange={toggleTheme} />}
          />
          <Avatar className={classes.purple}>JK</Avatar>
          <Typography>Jeyanth Kanagaraju</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
