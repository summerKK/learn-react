import {applyMiddleware, compose, createStore} from "redux"
import combineReducers from "reducers"
import thunkMiddleware from "redux-thunk"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

export default store