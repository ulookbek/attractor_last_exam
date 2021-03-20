import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { AnonymousMenu } from "./Menu";
import { UserMenu } from "./Menu";
import CssBaseline from "@material-ui/core/CssBaseline";



const useStyles = makeStyles(theme => ({
    mainLink: {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            color: "inherit"
        }
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: "flex"
    },
    dropdownBtn: {
        color: theme.palette.common.white
    }
}));

const Layout = ({ user, children }) => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Container className={classes.container}>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.mainLink}>Cafe Critic</Link>
                        </Typography>
                        {user ?
                            <UserMenu user={user} className={classes.dropdownBtn} />
                            :
                            <AnonymousMenu />
                        }
                    </Container>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar} />
            <Container>
                <main>
                    {children}
                </main>
            </Container>
        </>
    );
};

export default Layout;