import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
  Avatar,
} from "@material-ui/core";

import clsx from "clsx";
import PropTypes from "prop-types";

import useStyles from "./styles";

function Header({ isThemeLight, setIsThemeLight }) {
  const classes = useStyles();

  const toggleTheme = (e) => {
    setIsThemeLight(e.target.checked ? "dark" : "light");
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  };

  return (
    <AppBar position="static" className={clsx(classes.appBar)} elevation={0}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" noWrap>
          Consumer 360
        </Typography>
        <div className={classes.rightContent}>
          <FormControlLabel
            control={
              <Switch
                checked={isThemeLight !== "light"}
                onChange={toggleTheme}
              />
            }
          />
          <Avatar className={classes.purple}>JK</Avatar>
          <Typography>Jeyanth Kanagaraju</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  setIsThemeLight: PropTypes.func.isRequired,
  isThemeLight: PropTypes.string.isRequired,
};

export default Header;
