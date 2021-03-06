import React, { Component } from "react";
import { createStore } from "./redux";
const ADD = "ADD";
const MINUS = "MINUS";
const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 };
        case MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
};

let initState = { number: 0 };
const store = createStore(reducer, initState);
class Counter1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.setState({ number: store.getState().number })
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => store.dispatch({ type: ADD })}>+</button>
                <button onClick={() => store.dispatch({ type: MINUS })}>
                    -
                </button>
                <button
                    onClick={() => {
                        setTimeout(() => {
                            store.dispatch({ type: ADD });
                        }, 1000);
                    }}
                >
                    1秒后加1
                </button>
            </div>
        );
    }
}
export default Counter1;
