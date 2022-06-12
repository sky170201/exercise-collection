import { useSelector, useDispatch } from "../react-redux";

function Username1() {
    const state = useSelector((state) => state.username);
    const dispatch = useDispatch();
    const changeUsername = () => {
        dispatch({
            type: "NAME",
            username: Math.random() * 100,
        });
    };
    return (
        <div>
            <h2>username1: {state.username}</h2>
            <button onClick={changeUsername}>change username</button>
        </div>
    );
}

export default Username1;
