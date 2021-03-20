import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import ViewPlace from "./pages/ViewPlace"
import AddPlace from "./pages/AddPlace"

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />;
};

const Routes = ({ user }) => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute
                path="/view-place/:id"
                exact
                component={ViewPlace}
                isAllowed={!user}
            />
            <ProtectedRoute
                path="/add-place"
                exact
                component={AddPlace}
                isAllowed={!user}
            />
        </Switch>
    );
};

export default Routes;