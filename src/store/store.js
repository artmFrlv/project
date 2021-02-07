import {combineReducers, compose, createStore} from "redux";
import reducerOfCheckers from "./reducers/reducerOfCheckers";
import reducerOfTicTacToe from "./reducers/reducerOfTicTacToe";
import reducerOfTetris from "./reducers/reducerOfTetris";

const reducer = combineReducers({
    ticTacToe: reducerOfTicTacToe,
    checkers: reducerOfCheckers,
    tetris: reducerOfTetris
});

const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;