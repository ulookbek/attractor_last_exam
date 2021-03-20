import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />;
};

const Routes = ({ user }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;