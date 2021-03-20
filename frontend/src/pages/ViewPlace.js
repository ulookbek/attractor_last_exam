import React, { useEffect } from "react"
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import { fetchPlace, fetchImagesOfPlace, fetchReviewsOfPlace } from "../store/actions/placesAction";
import { baseApi } from "../config/constants";
import imageNotAvailable from "../assets/images/image_not_available.png";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Gallery from "../components/ViewPlace/Gallery"
import ReviewsList from "../components/ViewPlace/ReviewsList";



const useStyles = makeStyles((theme) => ({
    image: {
        width: "100%"
    },
}));

function ViewPlace(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const place = useSelector(state => state.places.place);
    const imagesOfPlace = useSelector(state => state.places.imagesOfPlace);
    const reviewsOfPlace = useSelector(state => state.places.reviewsOfPlace);

    useEffect(() => {
        dispatch(fetchPlace(props.match.params.id));
        dispatch(fetchImagesOfPlace(props.match.params.id));
        dispatch(fetchReviewsOfPlace(props.match.params.id));
    }, [dispatch, props.match.params.id]);
    return (
        <>
            <Grid container spacing={3}>
                {place && <>
                    <Grid item xs={6}>
                        <Typography variant="h3" gutterBottom>
                            {place.title}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            {place.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img className={classes.image} src={place.main_image ? baseApi + "/uploads/" + place.main_image : imageNotAvailable} />
                    </Grid>
                    <Grid item xs={12}>
                        <Gallery imagesOfPlace={imagesOfPlace} />
                    </Grid>
                    <Grid item xs={12}>
                        <ReviewsList reviewsOfPlace={reviewsOfPlace} />
                    </Grid>

                </>}
            </Grid>
        </>
    )
}

export default ViewPlace
