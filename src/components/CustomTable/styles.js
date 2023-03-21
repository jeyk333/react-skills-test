import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  tableBody: {
    "& tr": {
      "&:nth-of-type(even)": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  actionData: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

const useStylesPagination = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export { useStyles, useStylesPagination };
