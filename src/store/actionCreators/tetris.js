import {TETRIS_CREATE_FIGURE} from "../actionTypes/tetris";

export function createFigure(number) {
    return {
        type: TETRIS_CREATE_FIGURE,
        number: number
    }
}