import PlaceCard from "../components/UI/PlaceCard"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../store/actions/placesAction";

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
                {places.map(place => {
                    return <PlaceCard
                        key={place._id}
                        id={place._id}
                        title={place.title}
                        image={place.main_image}
                        reviewsSum={123}
                        imagesSum={321} />

                })}
            </Grid>
        </div>
    )
}

export default Home
