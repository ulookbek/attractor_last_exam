import {FETCH_PLACES_SUCCESS} from "../actionTypes";

const initialState = {
    places: []
};

const placesReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PLACES_SUCCESS:
      return {...state, places: action.places};
    default:
      return state;
  }
};

export default placesReducer;