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
  drawerContainer: {
    padding: theme.spacing(2.5),
    background: theme.palette.primary.main,
    width: 280,
    flex: 1,
  },
  close: {
    cursor: "pointer",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    "& h5": {
      marginLeft: 10,
    },
  },
  manageItem: {
    background: theme.palette.common.white,
    marginBottom: 10,
  },
  spacer: {
    display: "none",
  },
  toolbar: {},
  message: {
    textAlign: "center",
    margin: "20px 0",
  },
}));

const useStylesPagination = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  pagesSection: {
    display: "flex",
    alignItems: "center",
  },
  page: {
    textAlign: "center",
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    width: 45,
    height: 45,
    fontSize: 15,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  active: {
    background: theme.palette.primary.main,
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  pageInput: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  textField: {
    padding: 8,

    width: 80,
    marginLeft: 7,
    fontSize: 12,
    "& input": {
      padding: 8,
    },
  },
}));

export { useStyles, useStylesPagination };
