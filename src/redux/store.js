import {applyMiddleware, compose, createStore} from "redux"
import combineReducers from "reducers"
import promiseMiddleware from "./middleware/promiseMiddleware";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers, composeEnhancers(
    applyMiddleware(promiseMiddleware)
))

export default store