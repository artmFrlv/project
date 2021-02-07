import initialState from "../initialState/tetris";

function reducerOfTetris(tetris = initialState, action) {
    return tetris;
}

export default reducerOfTetris;