import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import App from "./pages/App";
import Login from "./pages/Login";
import "./App.css";
import Header from "./components/Header";

function Router(props) {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
}

Router.propTypes = {};

export default Router;
