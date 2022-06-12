import { combineReducers } from "../../redux";

import counter1 from "./counter1";
import counter2 from "./counter2";
import username from "./username";

let rootReducer = combineReducers({
    counter1,
    counter2,
    username,
});

export default rootReducer;
