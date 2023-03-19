import {
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { Menu, ChevronLeft, Inbox, Mail } from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";

import useStyles from "./styles";

function SideMenu({ open, setOpen }) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div
        className={clsx(classes.toolbar, {
          [classes.hide]: !open,
        })}
      >
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </div>
      <List>
        <ListItem
          button
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
          >
            <Menu />
          </IconButton>
        </ListItem>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

SideMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideMenu;
