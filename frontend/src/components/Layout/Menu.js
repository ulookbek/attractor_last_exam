import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logoutUser } from "../../store/actions/usersActions";

export const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to="/register" color="inherit">Зарегестрироваться</Button>
            <Button component={NavLink} to="/login" color="inherit">Войти</Button>
        </>
    );
};

export const UserMenu = ({ user, className }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        dispatch(logoutUser());
    };
    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={className}
            >
                Hello, {user.displayName || user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};