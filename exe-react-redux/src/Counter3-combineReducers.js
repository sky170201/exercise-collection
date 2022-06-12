import React, { Component } from "react";
import { bindActionCreators } from "./redux";
import actions1 from "./store/actions/counter1";
import actions2 from "./store/actions/counter2";
import store from "./store";
const boundActions1 = bindActionCreators(actions1, store.dispatch);
const boundActions2 = bindActionCreators(actions2, store.dispatch);

class Counter1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(
            () =>
                (this.unsubscribe = store.subscribe(() =>
                    this.setState({ number: store.getState().counter1.number })
                ))
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActions1.add1}>+</button>
                <button onClick={boundActions1.minus1}>-</button>
            </div>
        );
    }
}
class Counter2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(
            () =>
                (this.unsubscribe = store.subscribe(() =>
                    this.setState({ number: store.getState().counter2.number })
                ))
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActions2.add2}>+</button>
                <button onClick={boundActions2.minus2}>-</button>
            </div>
        );
    }
}

class Counter extends Component {
    render() {
        return (
            <>
                <Counter1 />
                <Counter2 />
            </>
        );
    }
}
export default Counter;
// export default Counter2;
