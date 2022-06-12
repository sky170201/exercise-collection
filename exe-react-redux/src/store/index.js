import { createStore } from "../redux";
import reducer from "./reducers";
let counter1 = { number: 0 };
let counter2 = { number: 0 };
const store = createStore(reducer, { counter1, counter2 });
export default store;
