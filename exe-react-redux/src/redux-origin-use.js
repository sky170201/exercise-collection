import { createStore } from "./redux";

let counterValue = document.getElementById("counter-value");
const add = document.getElementById("add");
const minus = document.getElementById("minus");

const ADD = "ADD";
const MINUS = "MINUS";
const initCount = { count: 1 };
const reducer = (state = initCount, action) => {
    switch (action.type) {
        case ADD:
            return { count: state.count + 1 };
        case MINUS:
            return { count: state.count - 1 };
        default:
            return state;
    }
};
const store = createStore(reducer);

const render = () => {
    counterValue.innerHTML = store.getState().count;
};

store.subscribe(render);
render();

add.addEventListener("click", () => {
    store.dispatch({ type: ADD });
});
minus.addEventListener("click", () => {
    store.dispatch({ type: MINUS });
});
