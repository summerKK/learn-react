import React, {Component} from "react"
import {decrement, increment, reset} from "actions/counter";
import {connect} from "react-redux";

class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={() => this.props.increment()}>
                    自增
                </button>
                <button onClick={() => this.props.decrement()}>
                    自减
                </button>
                <button onClick={() => this.props.reset()}>
                    重置
                </button>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Counter)