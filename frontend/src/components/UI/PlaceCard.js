import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from "react-router-dom";
import imageNotAvailable from "../../assets/images/image_not_available.png";
import { baseApi } from "../../config/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    link: {
        fontSize: '20px',
        padding: theme.spacing(2)
    }
}));

export default function PlaceCard({ image, title, reviewsSum, imagesSum, id }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = baseApi + "/uploads/" + image;
    }
    return (
        <Grid item xs={4}>
            <Card className={classes.root}>
                <div className={classes.link}>
                    <Link to={`/view-place/${id}`} >{title}</Link>
                </div>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={cardImage}
                    />
                </CardActionArea>
                <CardContent>
                </CardContent>
                <CardActions disableSpacing>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">({reviewsSum} отзывов)</Typography>
                        <Typography component="legend">({imagesSum} фоток)</Typography>
                        <Rating name="read-only" value={value} readOnly />
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
}
