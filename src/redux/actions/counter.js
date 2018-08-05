export const INCREMENT = "counter/INCREMENT"
export const DECREMENT = "counter/DECREMENT"
export const RESET = "counter/RESET"
export const ADDTO100 = "counter/100"

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}

export function addTo100() {
    return {type: ADDTO100}
}