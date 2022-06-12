import React from "react";
import ReactDOM from "react-dom/client";

// import Counter from "./Counter1";
// import Counter from "./Counter2-bindActionCreators";
// import Counter from "./Counter3-combineReducers";

// Counter4-react-redux
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";
import Counter3 from "./components/Counter3";
import store from "./store";
import { Provider } from "./react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Counter1 />
        <Counter2 />
        <Counter3 />
    </Provider>
);
