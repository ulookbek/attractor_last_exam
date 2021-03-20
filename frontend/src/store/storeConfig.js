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


export const history = createBrowserHistory();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  users: usersReducer,
  places: placesReducer,
  router: connectRouter(history)
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
