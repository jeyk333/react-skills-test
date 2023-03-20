import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.primary.main,
  },
  contentWrapper: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(1, 2),
    width: "94%",
  },
  tabHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
  },
  autoComplete: {
    width: 250,
    marginLeft: 20,
    background: theme.palette.common.white,
    padding: theme.spacing(0, 1),
  },
}));

export default useStyles;
