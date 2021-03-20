import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    image: {
        width: "100%"
    },
    image2: {
        width: "100px",
        padding: theme.spacing(2)
    },
    inline: {
        display: 'inline',
    },
    date: {
        display: "block",
        position: "relative",
        paddingLeft: theme.spacing(18)
    },
    date_in: {
        position: "absolute",
        top: theme.spacing(0),
        left: -theme.spacing(0)
    }
}));

function ReviewsList({ reviewsOfPlace }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {reviewsOfPlace && reviewsOfPlace.map((review) => {
                return <React.Fragment key={review._id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText

                            primary={review.user.fullname}
                            secondary={
                                <>
                                    <span className={classes.date}>
                                        <span className={classes.date_in}>OVERALL:</span>
                                        <Rating
                                            name="half-rating-read"
                                            defaultValue={(review.interior + review.service + review.food) / 3}
                                            precision={0.5}
                                            readOnly />
                                    </span>
                                    <span className={classes.date}>
                                        <span className={classes.date_in}>QUALITY OF FOOD:</span>
                                        <Rating
                                            name="half-rating-read"
                                            defaultValue={review.food}
                                            precision={0.5}
                                            readOnly />
                                    </span>
                                    <span className={classes.date}>
                                        <span className={classes.date_in}>SERVICE QUALITY:</span> <Rating
                                            name="half-rating-read"
                                            defaultValue={review.service}
                                            precision={0.5}
                                            readOnly />
                                    </span>
                                    <span className={classes.date}>
                                        <span className={classes.date_in}>INTERIOR:</span> <Rating
                                            name="half-rating-read"
                                            defaultValue={review.interior}
                                            precision={0.5}
                                            readOnly />
                                    </span>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary" >
                                        {review.description}
                                    </Typography>
                                    <span className={classes.date}>
                                        {new Date(review.created_date).toLocaleString("ru", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            timezone: 'UTC',
                                        })}
                                    </span>


                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" /></React.Fragment>
            })}
        </List>
    )
}

export default ReviewsList
