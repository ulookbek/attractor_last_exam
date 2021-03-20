import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACE_SUCCESS,
  FETCH_IMAGES_OF_PLACES_SUCCESS,
  FETCH_REVIEWS_OF_PLACES_SUCCESS
} from "../actionTypes";

const initialState = {
  places: [],
  place: null,
  imagesOfPlace: null,
  reviewsOfPlace: null
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.places };
    case FETCH_PLACE_SUCCESS:
      return { ...state, place: action.place };
    case FETCH_IMAGES_OF_PLACES_SUCCESS:
      return { ...state, imagesOfPlace: action.images };
    case FETCH_REVIEWS_OF_PLACES_SUCCESS:
      return { ...state, reviewsOfPlace: action.reviews };
    default:
      return state;
  }
};

export default placesReducer;