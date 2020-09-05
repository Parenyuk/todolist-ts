import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListReducer} from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers( {
   reducer: TodoListReducer
})

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
const store = createStore(rootReducer, applyMiddleware(thunk));

// window.store = store;
export default store;



