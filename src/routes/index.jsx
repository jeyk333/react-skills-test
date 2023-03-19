import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainSearch from "../pages/MainSearch";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainSearch} />
      </Switch>
    </Router>
  );
}

export default Routes;
