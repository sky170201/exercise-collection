import React from "react";
import actions from "../store/actions/counter2";
import { useSelector, useBoundDispatch } from "../react-redux";

const Counter3 = (props) => {
    const { number } = useSelector((state) => state.counter2);
    const { add2, minus2 } = useBoundDispatch(actions);
    return (
        <div>
            <p>{number}</p>
            <button onClick={add2}>+</button>
            <button onClick={minus2}>-</button>
        </div>
    );
};

export default Counter3;
