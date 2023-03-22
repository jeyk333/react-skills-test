import { useState, useEffect } from "react";

import {
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Menu,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";

import useStyles from "./styles";
import CustomTable from "../../components/CustomTable";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

import { getAllTraits } from "../../services";

const DEFAULT_FILTERS = [
  { label: "Trait ID", enabled: false },
  { label: "Trait Name", enabled: false },
  { label: "Trait Description", enabled: false },
  { label: "Marketing Program", enabled: false },
];

function MainSearch({ isThemeLight, setIsThemeLight }) {
  const classes = useStyles();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("traits");
  const [traits, setTriats] = useState([]);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [tableHeaders, setTableHeaders] = useState([
    { label: "Trait ID", show: true },
    { label: "Trait Name", show: true },
    { label: "Description", show: true },
    { label: "Data Type", show: true },
    { label: "Personal Data", show: true },
  ]);

  const [searchFilters, setSearchFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(null);

  useEffect(() => {
    getAllTraits().then((resp) => setTriats(resp?.data?.items)); // Error cases not handled, as it's not required now
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handleFocus = (e) => {
    setShowFilters(e.currentTarget);
  };

  const handleFilterChange = (e) => {
    const filters = searchFilters.map((filter) => {
      if (e.target.name === filter.label) {
        return {
          ...filter,
          enabled: true,
        };
      }
      return { ...filter, enabled: false };
    });
    setSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchFilters(DEFAULT_FILTERS);
  };

  const filteredItems = searchText.length
    ? traits.filter((trait) =>
        trait.traitName.toLowerCase().includes(searchText.toLowerCase())
      )
    : traits;

  return (
    <div className={classes.root}>
      <SideMenu open={showSideMenu} setOpen={setShowSideMenu} />
      <main className={classes.contentWrapper}>
        <Header isThemeLight={isThemeLight} setIsThemeLight={setIsThemeLight} />
        <div className={classes.content}>
          <Typography variant="h4">Traits Management</Typography>
          <div className={classes.tabHeader}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="traits-tab"
              indicatorcolor="secondary"
            >
              <Tab label="TRAITS" value="traits" />
            </Tabs>
            <div className={classes.actionContainer}>
              <Button variant="contained" color="secondary">
                {checked ? "REUSE" : "CREATE TRAIT"}
              </Button>

              <div>
                <TextField
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  label="Search"
                  aria-controls="filter-menu"
                  color="secondary"
                  className={classes.autoComplete}
                  indicatorcolor="secondary"
                  aria-haspopup="true"
                  onClick={handleFocus}
                />
              </div>
              <Close onClick={handleClearSearch} />
            </div>
          </div>
          <div>
            {selectedTab === "traits" && (
              <div>
                <CustomTable
                  tableHeaders={tableHeaders}
                  traits={filteredItems}
                  checked={checked}
                  handleChecked={handleChecked}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  setTableHeaders={setTableHeaders}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {showFilters ? (
        <Menu
          id="filter-menu"
          open={!!showFilters}
          onClose={() => setShowFilters(null)}
          anchorEl={showFilters}
          getContentAnchorEl={null}
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <FormGroup className={classes.filterGroup}>
            {searchFilters.map((filter) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.enabled}
                    onChange={handleFilterChange}
                    name={filter.label}
                  />
                }
                label={filter.label}
              />
            ))}
          </FormGroup>
        </Menu>
      ) : null}
    </div>
  );
}

MainSearch.propTypes = {
  setIsThemeLight: PropTypes.func.isRequired,
  isThemeLight: PropTypes.string.isRequired,
};

export default MainSearch;
