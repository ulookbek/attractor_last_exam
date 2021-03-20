import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from "../store/actions/usersActions";
import FormElement from "../components/UI/FormElement";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        username: "",
        fullname: "",
        password: "",
    });

    const error = useSelector(state => state.users.registerError);
    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };
    const formSubmitHandler = e => {
        e.preventDefault();
        dispatch(registerUser({ ...state }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Авторизация
        </Typography>
                <form
                    className={classes.form}
                    onSubmit={formSubmitHandler}
                >
                    <Grid container spacing={2}>
                        <FormElement
                            error={getFieldError("fullname")}
                            name="fullname"
                            label="fullname"
                            value={state.fullname}
                            onChange={inputChangeHandler}
                        />
                        <FormElement
                            error={getFieldError("username")}
                            name="username"
                            label="Username"
                            value={state.username}
                            onChange={inputChangeHandler}
                        />
                        <FormElement
                            error={getFieldError("password")}
                            name="password"
                            label="Password"
                            type="password"
                            value={state.password}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
          </Button>
                </form>
            </div>
        </Container>
    );
};

export default Register;