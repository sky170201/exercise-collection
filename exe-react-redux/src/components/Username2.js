import { useSelector, useDispatch } from "../react-redux";

function Username2(props) {
    const state = useSelector((state) => state.username);
    return <h2>username2: {state.username}</h2>;
}

export default Username2;
