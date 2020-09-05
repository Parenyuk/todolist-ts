import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers( {
   reducer: reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
export default store;



