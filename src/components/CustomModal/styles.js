import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dataContainer: {
    padding: 14,
    background: theme.palette.primary.main,
  },
  traitDetails: {
    border: `1px solid ${theme.palette.common.white}`,
    "& div": {
      "&:nth-of-type(even)": {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  detailList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  programItem: {
    borderBottom: "1px solid",
    padding: 10,
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
}));

export default useStyles;
