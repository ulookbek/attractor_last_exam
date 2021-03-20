import PlaceCard from "../components/UI/PlaceCard"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from "react";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Home() {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);
    const user = useSelector(state => state.users.user);

    React.useEffect(() => {
        dispatch(fetchPlaces());
    }, [dispatch]);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <PlaceCard title={'Ала тоо'} image={'https://celebsupdate.com/wp-content/uploads/2019/12/Taylor-Hill.jpg'} reviewsSum={123} imagesSum={321} />
                <PlaceCard title={'Ала тоо'} image={'https://i.pinimg.com/originals/29/df/b1/29dfb1b856f37e7cd088ba33ba6bf392.jpg'} reviewsSum={123} imagesSum={321} />
            </Grid>
        </div>
    )
}

export default Home
