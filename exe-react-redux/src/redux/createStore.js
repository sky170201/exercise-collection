// 实现createStore方法

const createStore = (reducer, preloadedState) => {
    let state = preloadedState;
    let listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((l) => l());
        return action; // 返不返回都行
    }
    function subscribe(listener) {
        listeners.push(listener);
        // 返回一个取消订阅的方法，这里将listener变成闭包
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    }
    dispatch({ type: "@@REDUX/INIT" });
    return {
        getState,
        dispatch,
        subscribe,
    };
};

export default createStore;
