import React from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import Login from "../auth/Login";
import Register from "../auth/Register";
import FileUtils from "../dashboard/FileUtils";
import Property from "../dashboard/Property";
import PDFExample from "../dashboard/PDFExample";
import Chart from "../dashboard/Chart";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/property/:id" component={Property} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/fileUtils" component={FileUtils} />
        <PrivateRoute exact path="/charts" component={Chart} />
        <PrivateRoute exact path="/pdfGeneration" component={PDFExample} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
