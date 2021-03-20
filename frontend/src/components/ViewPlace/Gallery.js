import React from 'react'
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { baseApi } from "../../config/constants";
import imageNotAvailable from "../../assets/images/image_not_available.png";

const useStyles = makeStyles((theme) => ({
    image2: {
        height: "100%",
        maxHeight: "200px",
        overflow: 'hidden',
        padding: theme.spacing(2)
    },
    imageParent: {
        height: "200px"
    }
}));
function Gallery({ imagesOfPlace }) {
    const place = useSelector(state => state.places.place);
    const classes = useStyles();

    const sett = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
    }
    return (
        <>
            {imagesOfPlace &&
                <Slider {...sett}>
                    {
                        imagesOfPlace.map((img) => (
                            <div className={classes.imageParent}>
                                <img
                                    key={img._id}
                                    className={classes.image2}
                                    src={place.main_image ?
                                        baseApi + "/uploads/" +
                                        img.images :
                                        imageNotAvailable} />
                            </div>
                        ))
                    }
                </Slider>
            }
            <br></br>
        </>
    )
}

export default Gallery
