/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Theme from "../styles/Theme";
import Home from "../containers/Home";

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
