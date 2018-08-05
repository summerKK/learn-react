import {addTo100, decrement, increment, reset} from "actions/counter"
import store from "store"

console.log(store.getState())

let unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(reset())
store.dispatch(addTo100())

unsubscribe()