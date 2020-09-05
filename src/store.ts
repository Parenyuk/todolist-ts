import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListReducer} from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers( {
   reducer: TodoListReducer
})
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
const store = createStore(rootReducer, applyMiddleware(thunk));

// window.store = store;
export default store;



