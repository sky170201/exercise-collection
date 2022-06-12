import * as types from "../action-types";

let initialState = { number: 0 };

function counter1Reducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD1:
            return { number: state.number + 1 };
        case types.MINUS1:
            return { number: state.number - 1 };
        default:
            return state;
    }
}

export default counter1Reducer;
