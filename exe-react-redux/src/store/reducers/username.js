import * as types from "../action-types";

let initialState = { username: "candy" };

function usernameReducer(state = initialState, action) {
    console.log("action", action);
    switch (action.type) {
        case types.NAME:
            return { username: action.username };
        default:
            return state;
    }
}

export default usernameReducer;
