import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import ViewPlace from "./pages/ViewPlace"
import AddPlace from "./pages/AddPlace"
import Registration from "./pages/Registration"
import Autorization from "./pages/Autorization"

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
                isAllowed={true}
            />
            <ProtectedRoute
                path="/add-place"
                exact
                component={AddPlace}
                isAllowed={user}
                redirectTo={'/register'}
            />
            <ProtectedRoute
                path="/register"
                exact
                component={Registration}
                isAllowed={!user}
                redirectTo={'/'}
            />
            <ProtectedRoute
                path="/login"
                exact
                component={Autorization}
                isAllowed={!user}
                redirectTo={'/'}
            />
        </Switch>
    );
};

export default Routes;