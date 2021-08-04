import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { characterReducer, initialState} from "../reducers/Character";
import thunk from "redux-thunk";


const reducers = combineReducers({
  store: characterReducer,
});


export const store = createStore(
    reducers,
    initialState,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 
