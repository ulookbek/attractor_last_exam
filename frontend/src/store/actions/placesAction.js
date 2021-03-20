import { push } from "connected-react-router";
import axios from "../../config/axiosApi";
import { CREATE_PLACE_SUCCESS, FETCH_PLACES_SUCCESS } from "../actionTypes";

const fetchPlacesSuccess = places => {
    return { type: FETCH_PLACES_SUCCESS, places };
};

export const fetchPlaces = () => {
    return dispatch => {
        return axios.get("/establishments").then(response => {
            dispatch(fetchPlacesSuccess(response.data));
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