import { createStore, combineReducers } from "redux";
import { characterReducer, initialState } from "../reducers/Character";

const reducers = combineReducers({
  store: characterReducer,
});

export const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
