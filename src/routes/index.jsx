import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainSearch from "../pages/MainSearch";

function Routes({ isThemeLight, setIsThemeLight }) {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <MainSearch
              isThemeLight={isThemeLight}
              setIsThemeLight={setIsThemeLight}
              {...props}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

Routes.propTypes = {
  setIsThemeLight: PropTypes.func.isRequired,
  isThemeLight: PropTypes.bool.isRequired,
};

export default Routes;
