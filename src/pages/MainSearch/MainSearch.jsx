import { useState, useEffect } from "react";

import {
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";
import CustomTable from "../../components/CustomTable";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

import getAllTraits from "../../services";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

function MainSearch() {
  const classes = useStyles();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("traits");
  const [traits, setTriats] = useState([]);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllTraits().then((resp) => setTriats(resp?.data?.items));
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

  return (
    <div className={classes.root}>
      <SideMenu open={showSideMenu} setOpen={setShowSideMenu} />
      <main className={classes.contentWrapper}>
        <Header />
        <div className={classes.content}>
          <Typography variant="h4">Traits Management</Typography>
          <div className={classes.tabHeader}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="traits-tab"
              indicatorColor="secondary"
            >
              <Tab label="TRAITS" value="traits" />
            </Tabs>
            <div className={classes.actionContainer}>
              <Button variant="contained" color="secondary">
                {checked ? "REUSE" : "CREATE TRAIT"}
              </Button>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={[
                  "Trait ID",
                  "Trait Name",
                  "Trait Description",
                  "Marketing Program",
                ]}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </>
                )}
                className={classes.autoComplete}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    color="secondary"
                    indicatorColor="secondary"
                  />
                )}
              />
            </div>
          </div>
          <div>
            {selectedTab === "traits" && (
              <div>
                <CustomTable
                  traits={traits}
                  checked={checked}
                  handleChecked={handleChecked}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainSearch;
