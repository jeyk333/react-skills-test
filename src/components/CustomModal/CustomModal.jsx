import { useState } from "react";

import { Dialog, Tabs, Tab, DialogTitle, Typography } from "@material-ui/core";

import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";

import useStyles from "./styles";

function CustomModal({ handleClose, open, trait }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("traits");

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog
      onClose={() => handleClose(null)}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth="md"
    >
      <DialogTitle id="simple-dialog-title">
        Trait ID - {trait?.traitId}
      </DialogTitle>{" "}
      <Close className={classes.close} onClick={() => handleClose(null)} />
      <div className={classes.dataContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="traits-tab"
          indicatorColor="secondary"
        >
          <Tab label="TRAIT DETAILS" value="traits" />
          <Tab label="MARKETING PROPGRAMS" value="programs" />
        </Tabs>
        {selectedTab === "traits" && (
          <div className={classes.traitDetails}>
            <div className={classes.detailList}>
              <Typography>Trait Id</Typography>
              <Typography>{trait?.traitId}</Typography>
            </div>
            <div className={classes.detailList}>
              <Typography>Trait Name</Typography>
              <Typography>{trait?.traitName}</Typography>
            </div>
            <div className={classes.detailList}>
              <Typography>Description</Typography>
              <Typography>{trait?.description}</Typography>
            </div>
            <div className={classes.detailList}>
              <Typography>Data Type</Typography>
              <Typography>{trait?.dataType}</Typography>
            </div>
            <div className={classes.detailList}>
              <Typography>Personal Data</Typography>
              <Typography>{trait?.personalData ? "True" : "False"}</Typography>
            </div>
          </div>
        )}
        {selectedTab === "programs" && (
          <div className={classes.programList}>
            {trait?.marketingPrograms.map((program) => (
              <div className={classes.programItem}>
                <Typography variant="h6">{program}</Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}

CustomModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  trait: PropTypes.shape({
    traitId: PropTypes.number.isRequired,
    dataType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    traitName: PropTypes.string.isRequired,
    personalData: PropTypes.bool.isRequired,
    marketingPrograms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CustomModal;
