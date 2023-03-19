import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
  },
}));

export default useStyles;
