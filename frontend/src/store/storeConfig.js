import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import {
  connectRouter,
  routerMiddleware,
} from "connected-react-router";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./localStorageConfig";
import usersReducer from "./reducers/userReducer";
import placesReducer from "./reducers/placeReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();


const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
  places: placesReducer,

});

const persistedState = loadFromLocalStorage();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];
const enhancers = composeEnhancers(
  applyMiddleware(...middleware)
);
const store = createStore(
  rootReducer,
  persistedState,
  enhancers
);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  });
});


export default store;
