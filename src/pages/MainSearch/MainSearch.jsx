import { useState } from "react";

import useStyles from "./styles";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

function MainSearch() {
  const classes = useStyles();
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <div className={classes.root}>
      <SideMenu open={showSideMenu} setOpen={setShowSideMenu} />
      <main className={classes.content}>
        <Header />
        Content
      </main>
    </div>
  );
}

export default MainSearch;
