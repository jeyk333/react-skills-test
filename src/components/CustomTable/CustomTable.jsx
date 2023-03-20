import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import PropTypes from "prop-types";

import { useStyles, useStylesPagination } from "./styles";

function TablePaginationActions(props) {
  const classes = useStylesPagination();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CustomTable({
  traits,
  checked,
  handleChecked,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const classes = useStyles();

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={checked}
                  onChange={handleChecked}
                  inputProps={{ "aria-label": "header checkbox" }}
                />
              </TableCell>
              <TableCell>Trait ID</TableCell>
              <TableCell>Trait Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Personal Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {traits
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.traitId}>
                  <TableCell>
                    <Checkbox
                      checked={checked}
                      onChange={handleChecked}
                      inputProps={{ "aria-label": "checkbox" }}
                    />
                  </TableCell>
                  <TableCell>{row.traitId}</TableCell>
                  <TableCell>{row.traitName}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.dataType}</TableCell>
                  <TableCell>{row.personalData ? "true" : "false"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={traits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        classes={{
          toolbar: classes.toolbar,
          spacer: classes.spacer,
        }}
      />
    </Paper>
  );
}

CustomTable.propTypes = {
  traits: PropTypes.arrayOf(
    PropTypes.shape({
      traitId: PropTypes.number.isRequired,
      dataType: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      traitName: PropTypes.string.isRequired,
      personalData: PropTypes.bool.isRequired,
    })
  ).isRequired,
  checked: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default CustomTable;
