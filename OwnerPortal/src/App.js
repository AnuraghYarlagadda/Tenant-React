import React, { Fragment } from "react";
import "./App.css";
import "jquery/dist/jquery";
import "jquery.easing/jquery.easing";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <Router>
      <Fragment>
        <Landing />
      </Fragment>
    </Router>
  );
}

export default App;
