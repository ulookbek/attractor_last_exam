import { push } from "connected-react-router";
import axios from "../../config/axiosApi";
import {
    CREATE_PLACE_SUCCESS,
    FETCH_PLACES_SUCCESS,
    FETCH_PLACE_SUCCESS,
    FETCH_IMAGES_OF_PLACES_SUCCESS,
    FETCH_REVIEWS_OF_PLACES_SUCCESS
} from "../actionTypes";

const fetchPlacesSuccess = places => {
    return { type: FETCH_PLACES_SUCCESS, places };
};
const fetchPlaceSuccess = place => {
    return { type: FETCH_PLACE_SUCCESS, place };
};
const fetchImagesOfPlaceSuccess = images => {
    return { type: FETCH_IMAGES_OF_PLACES_SUCCESS, images };
};

const fetchReviewsOfPlaceSuccess = reviews => {
    return { type: FETCH_REVIEWS_OF_PLACES_SUCCESS, reviews };
};
export const fetchPlaces = () => {
    return dispatch => {
        return axios.get("/establishments").then(response => {
            dispatch(fetchPlacesSuccess(response.data));
        });
    };
};

export const fetchPlace = (id) => {
    return dispatch => {
        return axios.get(`/establishments/${id}`).then(response => {
            dispatch(fetchPlaceSuccess(response.data));
        });
    };
};

export const fetchImagesOfPlace = (id) => {
    return dispatch => {
        return axios.get(`/images/${id}`).then(response => {
            dispatch(fetchImagesOfPlaceSuccess(response.data));
        });
    };
};

export const fetchReviewsOfPlace = (id) => {
    return dispatch => {
        return axios.get(`/reviews/${id}`).then(response => {
            dispatch(fetchReviewsOfPlaceSuccess(response.data));
        });
    };
};

const createPlaceSuccess = () => {
    return { type: CREATE_PLACE_SUCCESS };
};

export const createPlaces = placeData => {
    return async dispatch => {
        await axios.post("/establishments", placeData);
        dispatch(createPlaceSuccess());
        dispatch(push("/"));
    };
};