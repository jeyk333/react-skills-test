import { useState, useEffect } from "react";

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
  Drawer,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Tune,
  Close,
} from "@material-ui/icons";

import PropTypes from "prop-types";

import { useStyles, useStylesPagination } from "./styles";
import CustomModal from "../CustomModal";

/** Pagination Component Start */
function TablePaginationActions(props) {
  const classes = useStylesPagination();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  const [inputPage, setInputPage] = useState(page + 1);

  useEffect(() => {
    setInputPage(page + 1);
  }, [page]);
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  function pageNumber(total, current) {
    const shownPages = 3;
    const result = [];
    if (current > total - shownPages) {
      result.push(total - 2, total - 1, total);
    } else {
      result.push(current, current + 1, current + 2, "...", total);
    }
    return result.filter((value) =>
      typeof value === "number" ? value > 0 : value
    );
  }

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleChangePageNumber = (event, item) => {
    onChangePage(event, item - 1);
  };

  const handlePageSumbit = (event) => {
    event.preventDefault();
    onChangePage(event, inputPage - 1);
  };

  const allPages = pageNumber(count / rowsPerPage, page + 1);

  return (
    <div className={classes.paginationContainer}>
      <div className={classes.pageInput}>
        <Typography variant="body2">Go to page</Typography>
        <form onSubmit={handlePageSumbit}>
          <TextField
            variant="outlined"
            className={classes.textField}
            value={inputPage}
            type="number"
            onChange={(e) => setInputPage(e.target.value)}
          />
        </form>
      </div>
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
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
        <div className={classes.pagesSection}>
          {allPages.length
            ? allPages.map((item) => (
                <Typography
                  key={item}
                  className={`${classes.page} ${
                    item - 1 === page ? classes.active : null
                  }`}
                  onClick={
                    item === "..."
                      ? null
                      : (e) => handleChangePageNumber(e, item)
                  }
                >
                  {item}
                </Typography>
              ))
            : null}
        </div>
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
          {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
        </IconButton>
      </div>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

/** Pagination Component Ends */

/** Table Component Ends */
function CustomTable({
  traits,
  checked,
  handleChecked,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  tableHeaders,
  setTableHeaders,
}) {
  const [showDataModal, setShowDataModal] = useState();
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const classes = useStyles();

  const handleTableColumn = (e) => {
    const headers = tableHeaders.map((header) => {
      if (header.label === e.target.name) {
        return {
          ...header,
          show: !header.show,
        };
      }
      return header;
    });
    setTableHeaders(headers);
  };

  const handleTableDataColumn = (value) => {
    const header = tableHeaders.find((item) => item.label === value);
    if (header && header.show) {
      return true;
    }
    return false;
  };

  const paginatedItems = traits.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              {tableHeaders.map((header) => {
                return header.show ? (
                  <TableCell key={header.label}>{header.label}</TableCell>
                ) : (
                  ""
                );
              })}
              <TableCell>
                <Tune
                  onClick={() => setShowColumnFilter(true)}
                  aria-controls="simple-menu"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {paginatedItems?.length
              ? paginatedItems.map((row) => (
                  <TableRow key={row.traitId}>
                    <TableCell>
                      <Checkbox
                        checked={checked}
                        onChange={handleChecked}
                        inputProps={{ "aria-label": "checkbox" }}
                      />
                    </TableCell>
                    {handleTableDataColumn("Trait ID") && (
                      <TableCell
                        className={classes.actionData}
                        onClick={() => setShowDataModal(row)}
                      >
                        {row.traitId}
                      </TableCell>
                    )}
                    {handleTableDataColumn("Trait Name") && (
                      <TableCell>{row.traitName}</TableCell>
                    )}
                    {handleTableDataColumn("Description") && (
                      <TableCell>{row.description}</TableCell>
                    )}
                    {handleTableDataColumn("Data Type") && (
                      <TableCell>{row.dataType}</TableCell>
                    )}
                    {handleTableDataColumn("Personal Data") && (
                      <TableCell>
                        {row.personalData ? "true" : "false"}
                      </TableCell>
                    )}
                    <TableCell />
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {!paginatedItems.length ? (
          <Typography className={classes.message}>
            No data to display
          </Typography>
        ) : null}
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
          caption: classes.caption,
        }}
        labelDisplayedRows={() => {
          return null;
        }}
      />
      {showColumnFilter && (
        <Drawer
          anchor="right"
          open={showColumnFilter}
          onClose={() => setShowColumnFilter(false)}
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerHeader}>
              <Close
                className={classes.close}
                onClick={() => setShowColumnFilter(false)}
              />

              <Typography variant="h5">Manage Columns</Typography>
            </div>
            <FormGroup>
              {tableHeaders.map((header) => (
                <FormControlLabel
                  key={header.label}
                  control={
                    <Switch
                      checked={header.show}
                      onChange={handleTableColumn}
                      name={header.label}
                    />
                  }
                  className={classes.manageItem}
                  label={header.label}
                />
              ))}
            </FormGroup>
          </div>
        </Drawer>
      )}

      {!!showDataModal && (
        <CustomModal
          open={!!showDataModal}
          handleClose={setShowDataModal}
          trait={showDataModal}
        />
      )}
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
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      show: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTableHeaders: PropTypes.func.isRequired,
};
/** Table Component Ends */

export default CustomTable;
